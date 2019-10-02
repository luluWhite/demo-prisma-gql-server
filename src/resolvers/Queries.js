const Query = {
    feed: (parent, args, context) => {
        return context.prisma.posts({ where: { published: true } })
    },
    drafts: (parent, args, context) => {
        return context.prisma.posts({ where: { published: false } })
    },
    post: (parent, { id }, context) => {
        return context.prisma.post({ id })
    },
    courses: async (parent, { first, skip, filter, orderBy }, ctx, info) => {
        const where = filter ? {
            OR: [
                { name_contains: filter },
                { description_contains: filter }
            ]
        } : {};

        const courses = await ctx.prisma.courses({ where, first, skip, orderBy }, `{id}`);
        /* const selectedConnection = `{
            aggregate {
                count
            }
        }`; */
        const connAggregate = await ctx.prisma.coursesConnection().aggregate()
        // const connPageInfo = await ctx.prisma.coursesConnection().pageInfo()
        // const connPageEdges = await ctx.prisma.coursesConnection().edges()
        console.log('19 -- courses: ', courses)
        console.log('20 -- connAggregate: ', connAggregate)
        return {
            courseIds: courses.map(each => each.id),
            count: connAggregate.count
        }
    },
    course: (parent, { where }, { prisma }, info) => {
        return prisma.course({ ...where });
    },
    user: (parent, { where }, { prisma }, info) => {
        return prisma.user({ ...where });
    }
};

module.exports = Query;
