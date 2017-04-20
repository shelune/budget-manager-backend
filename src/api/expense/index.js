import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, showExpenseCategories, showIncomeCategories } from './controller'
import { schema } from './model'
export Expense, { schema } from './model'

const router = new Router()
const { amount, expense_type, date, category, comment } = schema.tree

/**
 * @api {post} /expenses Create expense
 * @apiName CreateExpense
 * @apiGroup Expense
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam amount Expense's amount.
 * @apiParam expense_type Expense's expense_type.
 * @apiParam date Expense's date.
 * @apiParam category Expense's category.
 * @apiParam comment Expense's comment.
 * @apiSuccess {Object} expense Expense's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expense not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ amount, expense_type, date, category, comment }),
  create)

/**
 * @api {get} /expenses Retrieve expenses
 * @apiName RetrieveExpenses
 * @apiGroup Expense
 * @apiUse listParams
 * @apiSuccess {Object[]} expenses List of expenses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({required: true}),
  query(),
  index)

router.get('/categoriesExpense',
  token({required: true}),
  showExpenseCategories)

router.get('/categoriesIncome',
  token({required: true}),
  showIncomeCategories)

/**
 * @api {get} /expenses/:id Retrieve expense
 * @apiName RetrieveExpense
 * @apiGroup Expense
 * @apiSuccess {Object} expense Expense's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expense not found.
 */


router.get('/:id',
  show)

/**
 * @api {put} /expenses/:id Update expense
 * @apiName UpdateExpense
 * @apiGroup Expense
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam amount Expense's amount.
 * @apiParam expense_type Expense's expense_type.
 * @apiParam date Expense's date.
 * @apiParam category Expense's category.
 * @apiParam comment Expense's comment.
 * @apiSuccess {Object} expense Expense's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Expense not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ amount, expense_type, date, category, comment }),
  update)

/**
 * @api {delete} /expenses/:id Delete expense
 * @apiName DeleteExpense
 * @apiGroup Expense
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Expense not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
