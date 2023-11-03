'use strict'

const faker = require('faker')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    })

    await queryInterface.bulkInsert('Products', [
      {
        name: 'Mercedes AMG Benz F1 GEORGE RUSSELL gloves',
        amount: '10000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(50),
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ6k45unXw_a6Hj7qMbu2DqMuXJGeCpY4gWW8Tx6GSc3elgev2Jmfm8DpM6ihuo-b9TfQ9U_8KgvDve_6sBassR7VnftocWvvkZHft8UM5qI7M7gZnZoqqkQw&usqp=CAE',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Haas VF-18 #20 Kevin Magnussen F1 2018',
        amount: '5000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(50),
        image: 'https://agrmodels.co.uk/wp-content/uploads/2022/11/mag-haas-vf18-magnussen-1-43.jpg',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oracle Red Bull F1 Merchandise, Red Bull Racing 2023',
        amount: '122000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-2023-team-set-up-t-shirt_ss4_p-13334221+u-p4teptrd49jes21wsks2+v-46b752ca3ed34d3fa54ae9a308531785.jpg?_hv=2&w=600',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oracle Red Bull F1 Merchandise, Red Bull Racing 2023',
        amount: '122000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-2023-team-set-up-t-shirt_ss4_p-13334221+u-p4teptrd49jes21wsks2+v-46b752ca3ed34d3fa54ae9a308531785.jpg?_hv=2&w=600',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oracle Red Bull F1 Merchandise, Red Bull Racing 2023',
        amount: '122000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-2023-team-set-up-t-shirt_ss4_p-13334221+u-p4teptrd49jes21wsks2+v-46b752ca3ed34d3fa54ae9a308531785.jpg?_hv=2&w=600',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oracle Red Bull F1 Merchandise, Red Bull Racing 2023',
        amount: '122000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-2023-team-set-up-t-shirt_ss4_p-13334221+u-p4teptrd49jes21wsks2+v-46b752ca3ed34d3fa54ae9a308531785.jpg?_hv=2&w=600',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'BWT Alpine F1 Team 2023 T-Shirt - Black',
        amount: '1500',
        stock: faker.datatype.number(),
        description: faker.lorem.text(20),
        image: 'https://images.footballfanatics.com/alpine/bwt-alpine-f1-team-2023-t-shirt-black_ss4_p-13356049+u-ard4u1pbo648p8gq5tyj+v-02154f1269b249dea98203e66488bdb5.jpg?_hv=2&w=600',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'LEGO Technic McLaren Formula 1 Race Car 42141',
        amount: '15000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(20),
        image: 'https://www.toysrus.com.tw/dw/image/v2/BDGJ_PRD/on/demandware.static/-/Sites-master-catalog-toysrus/default/dw5a6b21ee/1/9/6/8/1968854c94fc8bd100fbfda3b400f2f5ec6e3b5d_31151_i1.jpg?sw=500&sh=500&q=75',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'McLaren 2023 Team Lando Norris Set Up T-Shirt',
        amount: '1500',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/mclaren-f1-team/mclaren-2023-team-lando-norris-set-up-t-shirt_ss4_p-13334201+u-1c4voeaqhw6j1yt74saa+v-ca2ffc02b8a243dfa4b309ab464d802a.jpg?_hv=2',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '2023 Charles Leclerc Driver T-shirt',
        amount: '1500',
        stock: faker.datatype.number(),
        description: faker.lorem.text(20),
        image: 'https://fueler.store/cdn/shop/products/scuderia-ferrari-2023-charles-leclerc-driver-t-shirt-fueler-store-1.jpg?v=1676371996',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Scuderia Ferrari 2023 Team Carlos Sainz T-Shirt',
        amount: '1500',
        stock: faker.datatype.number(),
        description: faker.lorem.text(30),
        image: 'https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-2023-team-carlos-sainz-t-shirt_ss4_p-13368597+u-fam96qn766o6oy69jf7d+v-c1f28d272ac34896880395300bce9652.jpg?_hv=2',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'JODIYAAH Bburago 1:43 2022 Alfa Romeo F1',
        amount: '10000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(60),
        image: 'https://m.media-amazon.com/images/I/61j8-C62l+L.jpg',
        size: 'L',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Scuderia Alpha Tauri F1 Team Polo',
        amount: '2000',
        stock: faker.datatype.number(),
        description: faker.lorem.text(20),
        image: 'https://thegridclothing.com/cdn/shop/products/scuderia-alphatauri-f1-official-men-s-team-polo-shirt-2021-blue-7678-p_1200x1200.png?v=1642321017',
        size: 'M',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Williams Racing 2023 Driver Cap - Alex Albon',
        amount: '1200',
        stock: faker.datatype.number(),
        description: faker.lorem.text(40),
        image: 'https://images.footballfanatics.com/williams-racing/williams-racing-2023-driver-cap-alex-albon_ss4_p-13347534+pv-1+u-vqqct5grwoh5zy8ovosh+v-e7f11d93c75842569b1b721abaa48b3f.jpg?_hv=2&w=900',
        size: 'M',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Aston Martin Cognizant F1 2023 Team Telescopic Compact Umbrella Green',
        amount: '800',
        stock: faker.datatype.number(),
        description: faker.lorem.text(20),
        image: 'https://paddockcollectionstore.com/cdn/shop/products/AMA23ACC02-ASTON-MARTIN-ARAMCO-COGNIZANT-F1-2023-OFFICIAL-TEAM-TELESCOPIC-UMBRELLA.a_1024x1024_bb5901b7-3fab-4024-aad8-91ab8d8ac69e.webp?v=1677080366',
        size: 'S',
        created_at: new Date(),
        updated_at: new Date()
      }]
    , {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
}
