
var SquiddyVault = artifacts.require("/Users/ae0h/ae0hPro/encode_mev_hack/contracts/squiddyVault.sol");

contract('SquiddyVault', (accounts) => {
    var creatorAddress = accounts[0];
    var firstOwnerAddress = accounts[1];
    var secondOwnerAddress = accounts[2];
    var externalAddress = accounts[3];
    var unprivilegedAddress = accounts[4]
    /* create named accounts for contract roles */

    before(async () => {
        /* before tests */
    });
    
    beforeEach(async () => {
        /* before each context */
    });

    it('should revert if ...', () => {
        return SquiddyVault.deployed()
            .then(instance => {
                return instance.publicOrExternalContractMethod(argument1, argument2, {from:externalAddress});
            })
            .then(result => {
                assert.fail();
            })
            .catch(error => {
                assert.notEqual(error.message, "assert.fail()", "Reason ...");
            });
        });

    context('testgroup - security tests - description...', () => {
        //deploy a new contract
        before(async () => {
            /* before tests */
            const newSquiddyVault =  await SquiddyVault.new()
        })
        

        beforeEach(async () => {
            /* before each tests */
        })

        

        it('fails on initialize ...', async () => {
            return assertRevert(async () => {
                await newSquiddyVault.initialize()
            })
        })

        it('checks if method returns true', async () => {
            assert.isTrue(await newSquiddyVault.thisMethodShouldReturnTrue())
        })
    })
});
