import { rest } from 'msw';
import jsonFile from '../mockdata-obj.json';

export const handlers = [
  rest.get('http://localhost:4200/playermanager', (req, res, ctx) => {
      return res (
          ctx.status(200),
          ctx.json(jsonFile)
      )
  })
];