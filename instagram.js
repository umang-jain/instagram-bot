const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;


const instagram = {
  browser:null,
  page:null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless:false
    });

    instagram.page = await instagram.browser.newPage();

  },

  login: async (username,password) => {
    await instagram.page.goto(BASE_URL,{
      waitUntill:'networkidle2'
    });

    await instagram.page.waitFor(1000);

    await instagram.page.type('input[name="username"]',username, {delay:100});
    await instagram.page.type('input[name="password"]',password, {delay:100});
    
    await instagram.page.waitFor(500);

    await instagram.page.evaluate( () => {
      Array.from( document.querySelectorAll('button[type="submit"]'))[0].click();
    });

    await instagram.page.waitFor(10000);
    // await instagram.page.waitFor('a > span[aria-label="Profile"]');
    // let loginButton = await instagram.page.$x('//button[contains(text(),"Log In")]');
    // await loginButton[0].click();
  },
  
  likeTagsProcess: async (tags = ["harrypotter"]) => {
    for(let tag of tags){

      await instagram.page.goto(TAG_URL(tag), { waitUntill:'networkidle2' });
      await instagram.page.waitFor(1000);

      let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

      for(let i=0;i<5;i++){
        let post = posts[i];

        await instagram.page.waitFor(2000);

        await post.click();
        // await instagram.page.waitFor('body[style="overflow:hidden;"]');
        await instagram.page.waitFor(4000);

        // let isLikable = await post.$('span[aria-label="Like"]');

        // if(isLikable){
        //   await post.click('span[aria-label="Like"]');
        // }
        await instagram.page.evaluate( () => {
          Array.from( document.querySelectorAll('span button'))[0].click();
        });

        await instagram.page.waitFor(2000);

        await instagram.page.evaluate( () => {
          let temp = Array.from(document.querySelectorAll('button[type = "button"]'));
          temp[temp.length - 1].click();
        });
        
      }
    }
  }

}

module.exports = instagram;