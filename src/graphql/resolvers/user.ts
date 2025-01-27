import User from '../../models/User';

const userResolvers = {
    Query: {
        leads: async (_:any, { limit, page }: { limit: number; page: number }) => {
            const leads = await User.findAll({
                limit: limit ? +limit : 10,
                offset: page ? 0 + (page - 1) * limit : 0
            });

            const totalCount = await User.count();

            return {
                leads,
                totalCount,
            };
        },

        lead: async (_: any, args: any) => {
            return await User.findByPk(args.id);
        }
    },

    Mutation: {
        register: async (
            _: any, 
            { name, email, mobile, postcode, services }: { name: string, email: string, mobile: string, postcode: string, services: string[] 
        }) => {
            const user = await User.create({ name, email, mobile, postcode, services });
            return user;
        }
    }
};

export default userResolvers;