import React from 'react'

import { render, screen } from '@testing-library/react'

import { toolLevel, toolType } from '../../enums'

import { UpgradePurchase } from './UpgradePurchase'

describe('<UpgradePurchase />', () => {
  let upgrade, props, toolLevels

  beforeEach(() => {
    upgrade = {
      id: 'test-upgrade',
      name: 'Test Upgrade',
      description: 'This is the greeetest update',
      ingredients: {
        'bronze-ore': 5,
        coal: 15,
      },
    }

    toolLevels = {
      [toolType.SCYTHE]: toolLevel.DEFAULT,
    }

    props = {
      handleUpgradeTool: jest.fn(),
      inventory: [],
      inventoryLimit: 99,
      playerInventoryQuantities: {
        'bronze-ore': 100,
        coal: 100,
      },
      toolLevels,
      upgrade,
    }
  })

  describe('render', () => {
    beforeEach(() => {
      render(<UpgradePurchase {...props} />)
    })

    test('it displays the name of the upgrade', () => {
      expect(screen.getByText(upgrade.name)).toBeInTheDocument()
    })

    test('it displays the description of the upgrade', () => {
      expect(screen.getByText(upgrade.description)).toBeInTheDocument()
    })

    test('it displays the ingredients required to craft the upgrade', () => {
      expect(screen.getByText('Ingredients required:')).toBeInTheDocument()
    })

    test('it contains an action to craft the upgrade', () => {
      expect(
        screen.getByRole('button', { name: /Upgrade Tool/ })
      ).toBeInTheDocument()
    })
  })

  describe('handle upgrade', () => {
    test('it calls the provided callback to handle the upgrade action', () => {
      render(<UpgradePurchase {...props} />)

      screen.getByRole('button').click()

      expect(props.handleUpgradeTool).toHaveBeenCalledWith(upgrade)
    })
  })
})
