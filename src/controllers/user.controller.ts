import { NextFunction, Request, Response } from "express";
import { sqlPool } from "../mysqlPool";
import jwt from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  try {
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
export const userUpdate = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateExistingUser(req.body);
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersList = await getUsers();
    res.json(usersList).status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const userDeleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await deleteUserById(id);
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
    const { image, id } = req.body;
    const newUser = await updateUserPfpById(image, id);
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
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const newUser = await updateUserInfoQuery(req.body);
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
  return rows[0][0];
}

async function getUsers() {
  // @ts-ignore

  const [rows] = await sqlPool.query<IUser[]>(
    `select * from user
     `
  );
  return rows[0];
}

async function createNewUser(user: any) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `insert into user (name, surname, email, country, city, street,telephone,gender,age,height,weight,amka,region,address_num,image) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`,
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
    ]
  );
  return row;
}

async function updateExistingUser(user: any) {
  // @ts-ignore

  const [row] = await sqlPool.query(
    `update user set name=?, surname=?, email=?, username=?, password=?, image=?, role=?, about=? where id=?
     `,
    [
      user.id,
      user.name,
      user.surname,
      user.email,
      user.username,
      user.password,
      user.image,
      user.role,
      user.about,
    ]
  );
  return row;
}

async function updateUserInfoQuery({
  userId,
  username,
  email,
  password,
  about,
}: {
  userId: string;
  username: string;
  email: string;
  password: string;
  about: string;
}) {
  const [row] = await sqlPool.query(
    "update user set username=?, email=?, password=?, about=? where id=?",
    [userId, username, email, password, about]
  );
  return row;
}

async function deleteUserById(id: any) {
  // @ts-ignore
  const [row] = await sqlPool.query<IUser>(
    `delete from user where id=?
     `,
    [id]
  );
  return row;
}

async function updateUserPfpById(image: any, id: any) {
  const [rows] = await sqlPool.query(`update user set image=? where id=?`, [
    image,
    id,
  ]);
  return rows;
}
