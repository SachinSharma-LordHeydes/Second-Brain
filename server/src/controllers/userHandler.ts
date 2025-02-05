import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import UserModel from '../models/userModel';


export const signUp = async (req: Request, res: Response) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success:false,
                message: 'Invalid request body'
            });
        }

        const { userName, password }: { userName: string; password: string } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                success:false,
                message: 'Username and password are required'
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        
        const createUserResponse=await UserModel.create({
            userName,
            password:hashedPassword
        })

        return res.status(200).json({
            success:true,
            message: 'User successfully signed up',
            userName
        });

    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'error while sign up',
            error:error.message
        });
    }
};



export const signIn = async (req: Request, res: Response) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success:false,
                message: 'Invalid request body'
            });
        }

        const { userName, password }: { userName: string; password: string } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                success:false,
                message: 'Username and password are required'
            });
        }

        const isValidUser=await UserModel.findOne({userName})

        if(!isValidUser){
            return res.status(500).json({
                message:"Invalid User",
                success:false
            })
        }


        const isValidPassword=await bcrypt.compare(password, isValidUser.password)
        console.log('Hashed password:', isValidPassword);

        if(!isValidPassword){
            return res.status(500).json({
                message:"Invalid Password",
                success:false
            })
        }

        const JWT_SECRET:string | undefined =process.env.JWT_SECRET
        if(!JWT_SECRET){
            return res.status(500).json({
                message:"JWT_SECRET is unavilabe",
                success:false
            })
        }

        const token =jwt.sign({
            id:isValidUser._id
        },JWT_SECRET)
        

        return res.status(201).json({
            success:true,
            message: 'User successfully signed in',
            token
        });

    } catch (error:any) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message: 'error while sign in',
            error:error.message
        });
    }
};
