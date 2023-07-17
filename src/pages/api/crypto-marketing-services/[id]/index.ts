import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cryptoMarketingServiceValidationSchema } from 'validationSchema/crypto-marketing-services';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.crypto_marketing_service
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCryptoMarketingServiceById();
    case 'PUT':
      return updateCryptoMarketingServiceById();
    case 'DELETE':
      return deleteCryptoMarketingServiceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCryptoMarketingServiceById() {
    const data = await prisma.crypto_marketing_service.findFirst(
      convertQueryToPrismaUtil(req.query, 'crypto_marketing_service'),
    );
    return res.status(200).json(data);
  }

  async function updateCryptoMarketingServiceById() {
    await cryptoMarketingServiceValidationSchema.validate(req.body);
    const data = await prisma.crypto_marketing_service.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCryptoMarketingServiceById() {
    const data = await prisma.crypto_marketing_service.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
