import type { InferSelectModel } from 'drizzle-orm';
import z from 'zod';
import isCidr from 'is-cidr';
import type { wgInterface } from './schema';

export type InterfaceType = InferSelectModel<typeof wgInterface>;

export type InterfaceCreateType = Omit<
  InterfaceType,
  'createdAt' | 'updatedAt'
>;

export type InterfaceUpdateType = Omit<
  InterfaceCreateType,
  'name' | 'createdAt' | 'updatedAt' | 'privateKey' | 'publicKey'
>;

const device = z
  .string({ message: t('zod.interface.device') })
  .min(1, t('zod.interface.device'))
  .pipe(safeStringRefine);

const cidr = z
  .string({ message: t('zod.interface.cidr') })
  .min(1, { message: t('zod.interface.cidr') })
  .refine((value) => isCidr(value), { message: t('zod.interface.cidrValid') })
  .pipe(safeStringRefine);

// AmneziaWG validation schemas
const amneziaJc = z
  .number({ message: t('zod.interface.amneziaJc') })
  .min(1, { message: t('zod.interface.amneziaJcMin') })
  .max(255, { message: t('zod.interface.amneziaJcMax') });

const amneziaJmin = z
  .number({ message: t('zod.interface.amneziaJmin') })
  .min(1, { message: t('zod.interface.amneziaJminMin') })
  .max(65535, { message: t('zod.interface.amneziaJminMax') });

const amneziaJmax = z
  .number({ message: t('zod.interface.amneziaJmax') })
  .min(1, { message: t('zod.interface.amneziaJmaxMin') })
  .max(65535, { message: t('zod.interface.amneziaJmaxMax') });

const amneziaS = z
  .number({ message: t('zod.interface.amneziaS') })
  .min(1, { message: t('zod.interface.amneziaSMin') })
  .max(65535, { message: t('zod.interface.amneziaSMax') });

const amneziaH = z
  .number({ message: t('zod.interface.amneziaH') })
  .min(1, { message: t('zod.interface.amneziaHMin') })
  .max(2147483647, { message: t('zod.interface.amneziaHMax') });

export const InterfaceUpdateSchema = schemaForType<InterfaceUpdateType>()(
  z.object({
    ipv4Cidr: cidr,
    ipv6Cidr: cidr,
    mtu: MtuSchema,
    port: PortSchema,
    device: device,
    enabled: EnabledSchema,
    jc: amneziaJc,
    jmin: amneziaJmin,
    jmax: amneziaJmax,
    s1: amneziaS,
    s2: amneziaS,
    h1: amneziaH,
    h2: amneziaH,
    h3: amneziaH,
    h4: amneziaH,
  })
);

export type InterfaceCidrUpdateType = {
  ipv4Cidr: string;
  ipv6Cidr: string;
};

export const InterfaceCidrUpdateSchema =
  schemaForType<InterfaceCidrUpdateType>()(
    z.object({
      ipv4Cidr: cidr,
      ipv6Cidr: cidr,
    })
  );
