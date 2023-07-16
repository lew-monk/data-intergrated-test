import mongoose from "mongoose"

export interface IGaurdian {
  name: string
  email: string
  password: string
  students: string[]
  _id?: string
}
export const gaurdianModel = new mongoose.Schema<IGaurdian>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
})

export type Gaurdian = typeof gaurdianModel
