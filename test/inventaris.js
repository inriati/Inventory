
const Inventaris = artifacts.require("Inventaris");

contract('Inventaris',(accounts)=>{
    let inventaris;

    beforeEach(async function () {
        inventaris = await Inventaris.deployed()
      });

    describe('deployment',async()=>{
        it('deployment success',async()=>{
            const address = inventaris.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })

    describe('insert',async()=>{
        it('insert success',async()=>{
            let nama,lokasi,kondisi
            nama ="alex"
            lokasi="aaa"
            kondisi="bbb"
            await inventaris.simpanData(nama,lokasi,kondisi)
            let jumlahInventori = await inventaris.jumlahInventori()
            assert.equal(1,jumlahInventori.words[0])

            await inventaris.simpanData('zzz','yyy','xxx')
            jumlahInventori = await inventaris.jumlahInventori()
            assert.equal(2,jumlahInventori.words[0])
            assert.notEqual(1,jumlahInventori.words[0])
            
        })
    })
})