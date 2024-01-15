import { Prisma, User } from "@prisma/client"
import { UsersRepository } from "../users-repository"

export class InMemoryUsersRepository implements UsersRepository{

  items:User[]= []

  async findByEmail(email:string){
    const user = this.items.find((item)=> item.email === email)

    if(!user){
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput){
    const user= {
      id:'user-1',
      name:data.name,
      email:data.email,
      password:data.password,
      created_at:new Date()
    }

    this.items.push(user)

    return user
  }
}

// {
//   async findByEmail(email){
//     return null
//   },

//   async create(data){
    
//   }
// }