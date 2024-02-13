import bcryptjs from "bcryptjs"

const hashPassword = (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  return hash
};

const compareHashPassword = (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
}

export {
  hashPassword,
  compareHashPassword
}