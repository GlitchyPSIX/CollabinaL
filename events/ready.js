module.exports = (client) => {
    client.user.setActivity(`${process.env.PREFIX}help | ${client.version}`, {
        type: 0
    })
    client.logger.log(`Collabina is working. Version: ${client.version}`);
    client.logger.log(`Owner ID is: ${process.env.OWNERID}, hardcoded prefix is ${process.env.PREFIX}.`);
}