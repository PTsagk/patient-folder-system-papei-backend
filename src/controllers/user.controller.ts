import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { IUserInfoRequest } from "../models/user_info_request";
import { sqlPool } from "../mysqlPool";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let [user]: any = await sqlPool.query(
      `SELECT * FROM user WHERE email = ? AND password = ?`,
      [email, password]
    );
    if (user.length < 1) {
      [user] = await sqlPool.query(
        `SELECT * FROM doctor WHERE email = ? AND password = ?`,
        [email, password]
      );
    }
    if (user.length < 1) {
      [user] = await sqlPool.query(
        `SELECT * FROM admin WHERE email = ? AND password = ?`,
        [email, password]
      );
    }
    if (user.length > 0) {
      const token = jwt.sign({ id: user[0].id, role: user[0].role }, "secret", {
        expiresIn: "1d",
      });
      res.cookie("auth", token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      res.json(user[0]).status(200);
      return;
    } else {
      res.status(404).json("User not found");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
    return;
  }
};
export const userAuth = async (req: Request, res: Response) => {
  try {
    // const { token } = req.body;
    // console.log(token);
    if ("auth" in req.cookies) {
      const { auth } = req.cookies;
      jwt.verify(auth as string, "secret", async (err, decoded) => {
        if (err) {
          console.error(err);
        }
        //@ts-ignore
        const { id, role } = decoded;
        const user = await getUserByIdQuery(id, role);
        if (user) {
          res.json(user).status(200);
        } else {
          throw new Error("User not found");
        }
      });
    } else {
      res.status(404).json("No auth");
      return;
    }
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
    return;
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth");
    res.json("OK").status(200);
    return;
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
    return;
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let user =
      (await getUserByEmailQuery(email, "user")) ??
      (await getUserByEmailQuery(email, "doctor")) ??
      (await getUserByEmailQuery(email, "admin"));
    if (user) {
      throw new Error("Email already in use");
      return;
    }
    await createNewUser(req.body);
    res.json("OK").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let user = await getUserByEmailQuery(email, "user");
    if (!user) {
      throw new Error("No user found with this email");
    }
    res.json(user).status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const doctorRegister = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let user =
      (await getUserByEmailQuery(email, "user")) ??
      (await getUserByEmailQuery(email, "doctor")) ??
      (await getUserByEmailQuery(email, "admin"));
    if (user) {
      throw new Error("Email already in use");
    }
    await createNewDoctor(req.body);
    res.json("OK").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
export const userUpdate = async (req: Request, res: Response) => {
  try {
    await updateExistingUser(req.body);
    res.json("OK").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const doctorUpdate = async (req: Request, res: Response) => {
  try {
    await updateExistingDoctor(req.body);
    res.json("Information Updated").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
export const partialUserUpdate = async (req: Request, res: Response) => {
  try {
    req.body.id = res.locals.id;
    await partiaUpdateExistingUser(req.body);
    res.json("OK").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const role = req.params.role;
    const usersList = await getUsers(role);
    res.json(usersList).status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const userDeleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const role = req.params.role;
    const user = await deleteUserById(id, role);
    if (!user) {
      throw new Error("User not found");
    }
    res.json("Deletion Successful").status(200);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

async function getUserByUsernameAndPassword(
  username: string,
  password: string
) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `select * from user where username=? and password=?
     `,
    [username, password]
  );
  //@ts-ignore
  return rows[0];
}

export async function getUserByIdQuery(id: number, role: userRole) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `select * from ${role} where id=?
    `,
    [id]
  );
  // @ts-ignore
  return rows[0];
}
export async function getUserByEmailQuery(email: string, role: userRole) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `select * from ${role} where email=?
    `,
    [email]
  );
  // @ts-ignore
  return rows[0];
}
export async function getAdminByIdQuery(id: string) {
  const [rows] = await sqlPool.query(
    `select * from admin where id=?
        `,
    [id]
  );
  // @ts-ignore
  return rows[0];
}

async function getUsers(role: string) {
  // @ts-ignore

  const [rows] = await sqlPool.query<IUser[]>(
    `select * from ${role}
     `
  );
  return rows;
}

export async function createNewUser(user: IUserInfoRequest) {
  const password = uuidv4();
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(

  const [row] = await sqlPool.query<any>(
    `insert into user (name, surname, email, country, city, street,telephone,gender,age,height,weight,amka,region,address_num,doctor_id,password) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`,
    [
      user.name,
      user.surname,
      user.email,
      user.country,
      user.city,
      user.street,
      user.telephone,
      user.gender,
      user.age,
      user.height,
      user.weight,
      user.amka,
      user.region,
      user.address_num,
      user.doctor_id,
      password,
    ]
  );
  console.log(row, "row");
  return { ...row, password };
}

async function createNewDoctor(doctor: any) {
  const password = uuidv4();
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `insert into doctor (name, surname, email,telephone,gender,amka,password) values (?, ?,  ?, ?, ?, ?, ?)`,
    [
      doctor.name,
      doctor.surname,
      doctor.email,
      doctor.telephone,
      doctor.gender,
      doctor.amka,
      password,
    ]
  );
  return row;
}

async function updateExistingUser(user: any) {
  // @ts-ignore

  const [row] = await sqlPool.query(
    `update user set name=?, surname=?, email=?, country=?, city=?, street=?,telephone=?,gender=?,age=?,height=?,weight=?,amka=?,region=?,address_num=?,doctor_id=? where id=?
     `,
    [
      user.name,
      user.surname,
      user.email,
      user.country,
      user.city,
      user.street,
      user.telephone,
      user.gender,
      user.age,
      user.height,
      user.weight,
      user.amka,
      user.region,
      user.address_num,
      user.doctor_id,
      user.password,
    ]
  );
  return row;
}

async function updateExistingDoctor(user: any) {
  // @ts-ignore

  const [row] = await sqlPool.query(
    `update doctor set name=?, surname=?, email=?, telephone=?, amka=? where id=?
     `,
    [user.name, user.surname, user.email, user.telephone, user.amka, user.id]
  );
  return row;
}
async function partiaUpdateExistingUser(user: any) {
  // @ts-ignore
  const [row] = await sqlPool.query(
    `UPDATE user SET 
      name = ?, 
      surname = ?, 
      email = ?, 
      country = ?, 
      city = ?, 
      street = ?, 
      telephone = ?, 
      age = ?, 
      height = ?, 
      weight = ?, 
      amka = ?, 
      region = ?, 
      address_num = ?, 
      password = ? 
     WHERE id = ?`,
    [
      user.name,
      user.surname,
      user.email,
      user.country,
      user.city,
      user.street,
      user.telephone,
      user.age,
      user.height,
      user.weight,
      user.amka,
      user.region,
      user.address_num,
      user.password,
      user.id,
    ]
  );
  return row;
}

async function deleteUserById(id: any, role: string) {
  // @ts-ignore
  const [row] = await sqlPool.query<IUser>(
    `delete from ${role} where id=?
     `,
    [id]
  );
  return row;
}

export type userRole = "admin" | "doctor" | "user";
