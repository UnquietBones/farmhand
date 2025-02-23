import React, { useState } from 'react'
import { array, func, number, object } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'

import { features } from '../../config'
import FarmhandContext from '../../Farmhand.context'
import {
  dollarString,
  getCostOfNextStorageExpansion,
  integerString,
  memoize,
  moneyString,
} from '../../utils'
import { items } from '../../img'
import { itemType, toolType } from '../../enums'
import {
  PURCHASEABLE_COMBINES,
  PURCHASEABLE_COW_PENS,
  PURCHASEABLE_FIELD_SIZES,
  PURCHASEABLE_SMELTERS,
  STORAGE_EXPANSION_AMOUNT,
} from '../../constants'
import Inventory from '../Inventory'
import TierPurchase from '../TierPurchase'

import { TabPanel, a11yProps } from './TabPanel'

import './Shop.sass'

/**
 * @param {Array.<farmhand.item>} shopInventory
 * @returns {Object.<'seeds' | 'fieldTools', Array.<farmhand.item>>}
 */
const categorizeShopInventory = memoize(shopInventory =>
  shopInventory.reduce(
    (acc, inventoryItem) => {
      acc[inventoryItem.type === itemType.CROP ? 'seeds' : 'fieldTools'].push(
        inventoryItem
      )

      return acc
    },
    { seeds: [], fieldTools: [] }
  )
)

export const Shop = ({
  handleCombinePurchase,
  handleCowPenPurchase,
  handleFieldPurchase,
  handleSmelterPurchase,
  handleStorageExpansionPurchase,
  inventoryLimit,
  money,
  purchasedCombine,
  purchasedCowPen,
  purchasedField,
  purchasedSmelter,
  shopInventory,
  toolLevels,

  storageUpgradeCost = getCostOfNextStorageExpansion(inventoryLimit),
}) => {
  const [currentTab, setCurrentTab] = useState(0)

  const { seeds, fieldTools } = categorizeShopInventory(shopInventory)

  return (
    <div className="Shop">
      <AppBar position="static" color="primary">
        <Tabs
          value={currentTab}
          onChange={(e, newTab) => setCurrentTab(newTab)}
          aria-label="Shop tabs"
        >
          <Tab {...{ label: 'Seeds', ...a11yProps(0) }} />
          <Tab {...{ label: 'Supplies', ...a11yProps(1) }} />
          <Tab {...{ label: 'Upgrades', ...a11yProps(2) }} />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <Inventory
          {...{
            items: seeds,
            isPurchaseView: true,
          }}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Inventory
          {...{
            items: fieldTools,
            isPurchaseView: true,
          }}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <ul className="card-list">
          {inventoryLimit > -1 && (
            <li>
              <Card>
                <CardHeader
                  {...{
                    avatar: (
                      <img
                        {...{ src: items['inventory-box'] }}
                        alt={'Inventory box'}
                      />
                    ),
                    title: 'Storage Unit',
                    subheader: (
                      <div>
                        <p>Price: {moneyString(storageUpgradeCost)}</p>
                        <p>
                          Current inventory space:{' '}
                          {integerString(inventoryLimit)}
                        </p>
                      </div>
                    ),
                  }}
                />
                <CardContent>
                  <Typography>
                    Purchase a Storage Unit to increase your inventory capacity
                    for {STORAGE_EXPANSION_AMOUNT} more items.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    {...{
                      disabled: money < storageUpgradeCost,
                      color: 'primary',
                      onClick: handleStorageExpansionPurchase,
                      variant: 'contained',
                    }}
                  >
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </li>
          )}

          <li>
            <TierPurchase
              {...{
                handleTierPurchase: handleFieldPurchase,
                maxedOutPlaceholder:
                  "You've purchased the largest field available!",
                purchasedTier: purchasedField,
                renderTierLabel: ({ columns, price, rows }) =>
                  `${dollarString(price)}: ${columns} x ${rows}`,
                tiers: PURCHASEABLE_FIELD_SIZES,
                title: 'Expand field',
              }}
            />
          </li>
          <li>
            <TierPurchase
              {...{
                handleTierPurchase: handleCowPenPurchase,
                maxedOutPlaceholder:
                  "You've purchased the largest cow pen available!",
                purchasedTier: purchasedCowPen,
                renderTierLabel: ({ cows, price }) =>
                  `${dollarString(price)}: ${cows} cow pen`,
                tiers: PURCHASEABLE_COW_PENS,
                title: 'Buy cow pen',
              }}
            />
          </li>
          <li>
            <TierPurchase
              {...{
                description:
                  'You can purchase a combine to automatically harvest your mature crops at the start of every day.',
                handleTierPurchase: handleCombinePurchase,
                maxedOutPlaceholder:
                  "You've purchased the best combine harvester available!",
                purchasedTier: purchasedCombine,
                renderTierLabel: ({ type, price }) =>
                  `${dollarString(price)}: ${type} combine harvester`,
                tiers: PURCHASEABLE_COMBINES,
                title: 'Buy combine harvester',
              }}
            />
          </li>
          {features.MINING && toolLevels[toolType.SHOVEL] ? (
            <li>
              <TierPurchase
                {...{
                  description:
                    'You can purchase a Smelter to convert ore into ingots and other useful items.',
                  handleTierPurchase: handleSmelterPurchase,
                  maxedOutPlaceholder: "You've already purchased the smelter!",
                  purchasedTier: purchasedSmelter,
                  renderTierLabel: ({ type, price }) =>
                    `${dollarString(price)}: ${type} Smelter`,
                  tiers: PURCHASEABLE_SMELTERS,
                  title: 'Buy smelter',
                }}
              />
            </li>
          ) : null}
        </ul>
      </TabPanel>
    </div>
  )
}

Shop.propTypes = {
  handleCombinePurchase: func.isRequired,
  handleCowPenPurchase: func.isRequired,
  handleFieldPurchase: func.isRequired,
  handleStorageExpansionPurchase: func.isRequired,
  inventoryLimit: number.isRequired,
  money: number.isRequired,
  purchasedCowPen: number.isRequired,
  purchasedField: number.isRequired,
  purchasedSmelter: number.isRequired,
  purchasedCombine: number.isRequired,
  shopInventory: array.isRequired,
  toolLevels: object.isRequired,
  valueAdjustments: object.isRequired,
}

export default function Consumer(props) {
  return (
    <FarmhandContext.Consumer>
      {({ gameState, handlers }) => (
        <Shop {...{ ...gameState, ...handlers, ...props }} />
      )}
    </FarmhandContext.Consumer>
  )
}
