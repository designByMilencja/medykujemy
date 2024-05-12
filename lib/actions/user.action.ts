"use server"
import {User} from '@/models/user.model'
import {connectToDatabase} from "@/lib/mongoose";

import {
    DeleteUserParams, EditEmployeeParams,
    EditEmployerParams,
    GetAllUsersParams, GetUserByIdParams,
    UpdateUserParams
} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";

export async function getUserById(params: GetUserByIdParams) {
    try {
        await connectToDatabase()
        const { userId } = params;
        const user = await User.findById(userId)
        return user
    } catch (e) {
        console.log('error z pobierania usera', e)
        throw e
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        await connectToDatabase()
        const {id, updateData, path} = params
        await User.findOneAndUpdate({id}, {updateData}, {new: true});
        revalidatePath(path)
        console.log('dane z update funkcji', id, updateData, path)
    } catch (e) {
        console.log('error z updatowania usera', e)
        throw e
    }
}

export async function editEmployer(params: EditEmployerParams) {
    try {
        await connectToDatabase();

        const { userId, brandLink,   city, additional, companyName,  accept, role,
            requirements, occupation, specialization, hours, responsibilities, contractType, path } = params;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("Nie znaleziono użytkownika");
        }
        user.companyname = companyName;
        user.brandLink =  brandLink;
        user.city = city;
        user.hours = hours;
        user.occupation = occupation;
        user.specialization = specialization;
        user.responsibilities = responsibilities;
        user.requirements = requirements;
        user.contractType = contractType;
        user.additional = additional;
        user.role = role;
        user.accept = accept;

        await user.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function editEmployee(params: EditEmployeeParams) {
    try {
        await connectToDatabase();

        const { userId, city, additional, experience,  accept, role,
             occupation, specialization, hours,  contractType, path } = params;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("Nie znaleziono użytkownika");
        }
        user.city = city;
        user.hours = hours;
        user.occupation = occupation;
        user.specialization = specialization;
        user.experience = experience;
        user.contractType = contractType;
        user.additional = additional;
        user.role = role;
        user.accept = true;

        await user.save();

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase()
        console.log(params, 'params to delete')
        const user = await User.findOne({_id: params})
        console.log('user był', user)
        if (!user) {
            throw new Error('Użytkownik o takim id nie został znaleziony')
        }
// kasowanie usera
        const deletedUser = await User.findByIdAndDelete({_id:params})
        console.log('user ale go usunieto', deletedUser)
        return deletedUser
    } catch (e) {
        console.log('error z usuwania usera', e)
        throw e
    }
}
// pobieranie wszystkich userów do job
export async function getAllUsers(params: GetAllUsersParams) {
    try {
        await connectToDatabase();
        // const { searchQuery, filter, page = 1, pageSize = 10 } = params;
        // const skipAmount = (page - 1) * pageSize;
        // const query: FilterQuery<typeof User> = {};
        // if (searchQuery) {
        //     query.$or = [
        //         { name: { $regex: new RegExp(searchQuery, "i") } },
        //         { username: { $regex: new RegExp(searchQuery, "i") } },
        //     ];
        // }
        // let sortOptions = {};
        // switch (filter) {
        //     case "new_users":
        //         sortOptions = { joinedAt: -1 };
        //         break;
        //     case "old_users":
        //         sortOptions = { joinedAt: 1 };
        //         break;
        //     case "top_contributors":
        //         sortOptions = { reputation: -1 };
        //         break;
        //     default:
        //         break;
        // }

        const users = await User.find({accept: true })
            .sort({createdAt: -1})
            // .skip(skipAmount)
        //     .limit(pageSize)
        //     .sort(sortOptions);
        //
        // const totalUsers = await User.countDocuments(query);
        // const isNext = totalUsers > skipAmount + users.length;
        return { users };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
