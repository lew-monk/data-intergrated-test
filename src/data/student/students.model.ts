import mongoose from "mongoose"

export interface IStudent {
  name: string
  email: string
  password: string
  course: string
  admissionDate: Date
  _id?: string
}
export const studentModel = new mongoose.Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: false,
  },
  admissionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
})

export type Student = typeof studentModel
