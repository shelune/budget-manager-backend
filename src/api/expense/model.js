import mongoose, { Schema } from 'mongoose'

const expenseSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  expense_type: {
    type: String,
    default: 'expense',
    enum: ['expense', 'income']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
})

expenseSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      amount: this.amount,
      expense_type: this.expense_type,
      date: this.date,
      category: this.category,
      comment: this.comment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Expense', expenseSchema)

export const schema = model.schema
export default model
