const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping list service object', function(){
    let db

    let testItems = [
        {
            id: 1,
            name: 'First test item!',
            price: '0.10',
            category: 'Main',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z')
            },
            {
            id: 2,
            name: 'Second test item!',
            price: '1.10',
            category: 'Main',
            checked: true,
            date_added: new Date('2100-05-22T16:28:32.615Z')
            },
            {
            id: 3,
            name: 'Third test item!',
            price: '100.02',
            category: 'Main',
            checked: true,
            date_added: new Date('1919-12-22T16:28:32.615Z')
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    after(() => db.destroy())

    afterEach(() => db('shopping_list').truncate())
    
    before(() => db('shopping_list').truncate())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllItems() resolves all articles from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves an article by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestList = testItems[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestList.name,
                        price: thirdTestList.price,
                        date_added: thirdTestList.date_added,
                        checked: thirdTestList.checked,
                        category: thirdTestList.category
                    })
                })
        })


        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                // copy the test articles array without the "deleted" article
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
            })
        })


        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated title',
                price: '1.00',
                date_added: new Date(),
                checked: true,
                category: 'Main'
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                expect(item).to.eql({
                    id: idOfItemToUpdate,
                    ...newItemData,
                })
            })
        })

    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })
    })

    it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
        const newItem = {
            name: 'updated title',
            price: '1.00',
            date_added: new Date(),
            checked: true,
            category: 'Main'
        }
        return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
            expect(actual).to.eql({
                id: 1,
                name: newItem.name,
                price: newItem.price,
                date_added: newItem.date_added,
                checked: newItem.checked,
                category: newItem.category
            })
        })
    })
})