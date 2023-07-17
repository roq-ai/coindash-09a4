import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.crypto_marketing_service?.length > 0) {
      const create_crypto_marketing_service = body.crypto_marketing_service;
      body.crypto_marketing_service = {
        create: create_crypto_marketing_service,
      };
    } else {
      delete body.crypto_marketing_service;
    }
    if (body?.service_plan?.length > 0) {
      const create_service_plan = body.service_plan;
      body.service_plan = {
        create: create_service_plan,
      };
    } else {
      delete body.service_plan;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
