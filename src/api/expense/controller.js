import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Expense } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Expense.create({ ...body, user })
    .then((expense) => expense.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({user}, res, next) =>
  Expense.find({user: user.id})
    .populate('user')
    .then((expenses) => expenses.map((expense) => expense.view()))
    .then(success(res))
    .catch(next)

export const showCategories = ({user}, res, next) =>
  Expense.find({user: user.id})
    .populate('user')
    .then((expenses) => {
      let categories = {}
      let categoriesArr = []
      let result = []
      expenses.map((expense) => {
        if (!_.has(categories, expense.category)) {
          console.log('found:', expense.amount)
          categories[`${expense.category}`] = expense.amount
        } else {
          if (expense.expense_type === 'expense') {
            categories[expense.category] += expense.amount
            console.log('found:', expense.amount)
          }
        }
      })

      // convert object of categories to array; sort it
      _.forOwn(categories, (value, key) => {
        categoriesArr.push({name: key, total: value})
      })

      categoriesArr = _.sortBy(categoriesArr, 'total')

      // push max categories to result
      for (let i = 0; i < 5; i++) {
        result.push(categoriesArr.pop())
      }

      // push others categories total
      let others = _.reduce(categoriesArr, (a, b) => {
        return {name: 'Others', total: a.total + b.total}
      }, {name: 'Others', total: 0})

      result.push(others)
      console.log('category sort limit 5:', result)

      return result
    })
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Expense.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((expense) => expense ? expense.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Expense.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((expense) => expense ? _.merge(expense, body).save() : null)
    .then((expense) => expense ? expense.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Expense.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((expense) => expense ? expense.remove() : null)
    .then(success(res, 204))
    .catch(next)
