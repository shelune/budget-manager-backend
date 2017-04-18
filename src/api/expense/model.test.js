import { Expense } from '.'
import { User } from '../user'

let user, expense

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  expense = await Expense.create({ user, amount: 'test', expense_type: 'test', date: 'test', category: 'test', comment: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = expense.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expense.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(expense.amount)
    expect(view.expense_type).toBe(expense.expense_type)
    expect(view.date).toBe(expense.date)
    expect(view.category).toBe(expense.category)
    expect(view.comment).toBe(expense.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = expense.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(expense.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(expense.amount)
    expect(view.expense_type).toBe(expense.expense_type)
    expect(view.date).toBe(expense.date)
    expect(view.category).toBe(expense.category)
    expect(view.comment).toBe(expense.comment)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
