import {formatDate} from '../misc'

test('formatDate formats the date to look nice', () => {
  const date = new Date('December 12, 2001')
  expect(formatDate(date)).toBe('Dec 01')
})
