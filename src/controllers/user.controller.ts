import { NextFunction, Request, Response } from "express";
import { sqlPool } from "../mysqlPool";
import jwt from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const role = req.params.role;
    const [user]: any = await sqlPool.query(
      `SELECT * FROM ${role} WHERE email = ?`,
      [email]
    );
    if (user.length > 0) {
      const token = jwt.sign({ id: user[0].id }, "secret", {
        expiresIn: "1h",
      });
      res.cookie("auth", token, { httpOnly: true });
      res.json(user[0]).status(200);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
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
        const { id } = decoded;
        const user = await getUserByIdQuery(id);
        if (user) {
          res.json(user).status(200);
        } else {
          throw new Error("User not found");
        }
      });
    } else {
      res.status(404).json("No auth");
    }
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    await createNewUser(req.body);
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};
export const doctorRegister = async (req: Request, res: Response) => {
  try {
    await createNewDoctor(req.body);
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};
export const userUpdate = async (req: Request, res: Response) => {
  try {
    await updateExistingUser(req.body);
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const role = req.params.role;
    const usersList = await getUsers(role);
    res.json(usersList).status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
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
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const updateUserPfp = async (req: Request, res: Response) => {
  try {
    const role = req.params.role;
    const { image, id } = req.body;
    const newUser = await updateUserPfpById(image, id, role);
    //@ts-ignore
    if (newUser.affectedRows > 0) {
      res.status(200).json("OK");
    } else {
      throw new Error("Uknown error");
    }
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
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
  return rows[0][0];
}

export async function getUserByIdQuery(id: number) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `select * from user where id=?
    `,
    [id]
  );
  // @ts-ignore
  return rows[0][0];
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
  return rows[0];
}

async function createNewUser(user: any) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `insert into user (name, surname, email, country, city, street,telephone,gender,age,height,weight,amka,region,address_num,image,doctor_id,password) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`,
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
      user.image,
      user.doctor_id,
      user.password,
    ]
  );
  return row;
}

async function createNewDoctor(doctor: any) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `insert into user (name, surname, email, country, city, street,telephone,gender,age,height,weight,amka,region,address_num,image,doctor_id,password) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`,
    [
      doctor.name,
      doctor.surname,
      doctor.email,
      doctor.country,
      doctor.city,
      doctor.street,
      doctor.telephone,
      doctor.gender,
      doctor.amka,
      doctor.image,
      doctor.password,
    ]
  );
  return row;
}

async function updateExistingUser(user: any) {
  // @ts-ignore

  const [row] = await sqlPool.query(
    `update user set name=?, surname=?, email=?, country=?, city=?, street=?,telephone=?,gender=?,age=?,height=?,weight=?,amka=?,region=?,address_num=?,image=?,doctor_id=? where id=?
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
      user.image,
      user.doctor_id,
      user.password,
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

async function updateUserPfpById(image: any, id: any, role: string) {
  const [rows] = await sqlPool.query(`update ${role} set image=? where id=?`, [
    image,
    id,
  ]);
  return rows;
}
