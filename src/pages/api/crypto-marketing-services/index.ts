import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { cryptoMarketingServiceValidationSchema } from 'validationSchema/crypto-marketing-services';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCryptoMarketingServices();
    case 'POST':
      return createCryptoMarketingService();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCryptoMarketingServices() {
    const data = await prisma.crypto_marketing_service
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'crypto_marketing_service'));
    return res.status(200).json(data);
  }

  async function createCryptoMarketingService() {
    await cryptoMarketingServiceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.crypto_marketing_service.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
