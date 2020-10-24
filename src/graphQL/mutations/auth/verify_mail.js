const { MessageType } = require('../../types/types')
const { validate_controller } = require('../../../controllers/validate_controller')
const { checkToken } = require('../../../policies')

const VerifyMailMutation = {
    type: MessageType,

    async resolve(parent,args,root) {
        let decoded = checkToken(root.headers.authorization)
        if (decoded.errors.length) return decoded

        return await validate_controller(decoded.user)

    }
}

module.exports = VerifyMailMutation
