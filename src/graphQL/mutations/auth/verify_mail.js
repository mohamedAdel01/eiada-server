const { MessageType } = require('../../types/types')
const {service} = require('../../../services/validateServices')
const { checkToken } = require('../../../policies')

const VerifyMailMutation = {
    type: MessageType,

    async resolve(parent,args,root) {
        let decoded = checkToken(root.headers.authorization)
        if (decoded.errors.length) return decoded

        return await service(decoded.user)

    }
}

module.exports = VerifyMailMutation
