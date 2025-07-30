describe('Oripari Dev Admin', function () {
    beforeEach(() => {
        cy.visit("https://admin.dev.oripari.com.au/");
        cy.get('input[name="email"]').type('admin@oripari.com');
        cy.get('input[name="password"]').type('Admin@123');
        cy.get('button[role="checkbox"]').click();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');

        cy.get('aside').invoke('show');
    });

  it('Dashboard', () => {
        cy.get('aside').should('be.visible');
        cy.contains('span.flex-1.truncate', 'Dashboard').click();
        cy.get('h1').should('contain.text', 'Dashboard');
   });

  it('Cake Categories', () => {
        cy.get('aside').should('be.visible');
        cy.contains('span.flex-1.truncate', 'Categories').click();

        // Add Category
        cy.contains('button[type="button"]', 'Add Category').click();
        cy.get('input[placeholder="e.g. Birthday Cakes"]')
            .should('be.visible')
            .clear()
            .type('Black Forest');
        cy.get('input[type="file"]').eq(0).attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Add Category').click();

        // Update Category
        cy.get('input[placeholder="e.g. Birthday Cakes"]', { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type('Red Forest');
        cy.get('input[type="file"]').eq(0).attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Add Category').click({ force: true });

        // Delete Category
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Deleted successfully');
        });
        cy.xpath("(//button[.//span[text()='Delete']])[2]").should('be.visible').click();
    });
    

    it('Cakes Products', () => {

        //View the list of cakes
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.contains('span.flex-1.truncate', 'Cakes').click();
        //View all cakes
        cy.get('button[role="combobox"]').click();
        cy.contains('span', 'All Cakes').parent().click({ force: true });
        //View the details of the first cake
        cy.xpath("(//button[.//span[text()='View']])[1]").should('be.visible').click();
        cy.xpath("(//button[.//span[text()='Close']])[1]").should('be.visible').click();
        //Add Cake
        cy.contains('button[type="button"]', 'Add Cake').click();
        cy.get('input[placeholder="e.g. Chocolate Delight"]').clear().type('Party Cake');
        cy.get('button[role="combobox"]').eq(1).click({ force: true });
        cy.contains('Wedding Cake').click({ force: true });
        cy.get('input[placeholder="e.g. 45.99"]').type('30');
        cy.get('input[placeholder="e.g. Round, Square"]').type('Square');
        cy.get('input[placeholder="e.g. 8"]').type('10');
        cy.get('input[placeholder="e.g. Sponge, Chocolate"]').type('Chocolate');
        cy.get('input[placeholder="e.g. Chocolate chips, Sprinkles"]').type('Sprinkles');
        cy.get('textarea[placeholder*="Describe the cake"]').type('With some chocolate sprinkle on the top');
        cy.get('input[type="file"]').attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Add Cake').click();

        //Update cake
        cy.xpath("(//button[.//span[text()='Edit']])[1]").should('be.visible').click();
        cy.get('input[placeholder="e.g. Chocolate Delight"]').clear().type('Anniversary cake');
        cy.get('button[role="combobox"]').click();
        cy.contains('span', 'Black Forest').parent().click({ force: true });
        cy.get('input[placeholder="e.g. 50"]').clear().type('30');
        cy.get('input[placeholder="e.g. Round, Square"]').clear().type('Rectangle');
        cy.get('input[placeholder="e.g. 8"]').clear().type('10');
        cy.get('input[placeholder="e.g. Sponge, Chocolate"]').clear().type('Chocolate');
        cy.get('input[placeholder="e.g. Chocolate chips, Sprinkles"]').clear().type('Sprinkles');
        cy.get('textarea[placeholder*="Describe the cake"]').clear().type('With some chocolate sprinkle on the top');
        cy.get('input[type="file"]').attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Update Cake').click();
        //Delete the cake
        cy.xpath("//button[.//span[text()='Delete']]").first().click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Deleted successfully'); // or your alert message
        });
    });
    it('Orders', () => {

        //view the list of orders
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.contains('span.flex-1.truncate', 'Orders').click();
        cy.get('button')
            .find('svg')
            .should('have.attr', 'xmlns', 'http://www.w3.org/2000/svg') // Confirm it's an SVG
            .and('be.visible');
        cy.get('button[role="combobox"]').click();
        cy.contains('span', 'All Orders').parent().click({ force: true });


        //Update status of the first order
        cy.xpath("/html/body/div/div/main/div/div[2]/div[2]/div/table/tbody/tr[1]/td[7]/div/button[1]").should('be.visible').click();
        cy.get('button[role="combobox"]').eq(1).click();
        cy.contains('div[role="option"]', 'Pending').click();
        cy.xpath("//button[normalize-space()='Update Status']").should('be.visible').click();

        //view the details of the first order
        cy.xpath('/html/body/div/div/main/div/div[2]/div[2]/div/table/tbody/tr[1]/td[7]/div/button[2]').should('be.visible').click();
        cy.xpath("(//button[.//span[text()='Close']])[1]").should('be.visible').click();
    });
    it('News', () => {

        //view the list of news
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.get(':nth-child(3) > .ml-6 > .flex-col > .flex').click();
        cy.xpath("//button[normalize-space()='Create News']").should('be.visible').click();

        //Add a new news
        cy.contains('label', 'Title') // get the label with "Title"
            .next('input') // get the input right after
            .type('Holi Festival');
        cy.contains('label', 'Category') // get the label with "Title"
            .next('input') // get the input right after
            .type('Festival');
        cy.contains('label', 'Source Name') // get the label with "Title"
            .next('input') // get the input right after
            .type('Google');
        cy.contains('label', 'Source URL') // get the label with "Title"
            .next('input') // get the input right after
            .type('Google.com');
        cy.contains('label', 'Description') // get the label with "Title"
            .next('textarea') // get the input right after
            .type('Holi is a festival of colors celebrated in Nepal and India. It marks the arrival of spring and the victory of good over evil. People celebrate by throwing colored powders, singing, dancing, and enjoying festive foods.');
        cy.get('input[type="file"]').eq(0).attachFile('trial.png', { force: true });
        cy.get('input[type="file"]').eq(1).attachFile('trial.png', { force: true });
        cy.xpath("//div[@class='flex justify-end gap-4']//button[normalize-space()='Create News']").should('be.visible').click();

        //View the news
        cy.xpath("/html/body/div/div/main/div/div[2]/div[2]/div/table/tbody/tr[1]/td[5]/div/button[1]").should('be.visible').click();
        // cy.xpath("//a[normalize-space()='Google.com']").should('be.visible').click();
        cy.xpath("(//button[.//span[text()='Close']])[1]").should('be.visible').click();

        //update the news
        cy.xpath("/html/body/div/div/main/div/div[2]/div[2]/div/table/tbody/tr[1]/td[5]/div/button[2]").should('be.visible').click();
        cy.contains('label', 'Title')
            .parent()
            .find('input')
            .clear()
            .type('Holiday');
        cy.contains('label', 'Category')
            .parent()
            .find('input')
            .clear()
            .type('Vacation');
        cy.contains('label', 'Source Name')
            .parent()
            .find('input')
            .clear()
            .type('Routine of Nepal Banda');
        cy.contains('label', 'Source URL')
            .parent()
            .find('input')
            .clear()
            .type('Wekipedia.com');
        cy.contains('label', 'Description')
            .parent()
            .find('textarea')
            .clear()
            .type('Holiday is a day of festivity or recreation when no work is done. It is often associated with religious or cultural observances.');
        cy.get('input[type="file"]').eq(0).attachFile('trial.png', { force: true });
        cy.get('input[type="file"]').eq(1).attachFile('trial.png', { force: true });
        cy.xpath("//button[normalize-space()='Update News']").should('be.visible').click();




        //Delete the news
        cy.xpath("/html/body/div/div/main/div/div[2]/div[2]/div/table/tbody/tr[1]/td[5]/div/button[3]").click({ force: true });
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Deleted successfully'); // or your alert message
        });
    });
    it('Ecard Categories', () => {

        //view the list of categories of ecards
        cy.get('svg.lucide-chevron-down').eq(0);
        cy.get('aside').should('be.visible');
        cy.get('span.flex-1.truncate')
            .filter(':contains("Categories")')
            .last()
            .click();
        cy.url().should('include', '/categories');

        //Edit the first category
        cy.xpath("(//button[.//span[text()='Edit']])[1]").should('be.visible').click();
        cy.get('input[placeholder="e.g. Ecard"]').clear().type('Holi');
        cy.get('input[type="file"]').attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Update Category').click();

        //delete the first category
        cy.xpath("(//button[.//span[text()='Delete']])[2]").click({ force: true });

    });
    it('Ecards', () => {

        //view the list of ecards
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.contains('span.flex-1.truncate', 'Ecards').click();

        cy.get('button[role="combobox"]').first().click({ force: true });

        cy.contains('Baby Shower', { timeout: 5000 }).click({ force: true });
        //Combobox selection
        cy.get('button[role="combobox"]').first().should('contain.text', 'Baby Shower');
        //Add a new ecard
        cy.contains('button[type="button"]', 'Add Ecard').click();
        cy.get('button[role="combobox"]').eq(1).click(); // open dropdown
        cy.contains('div[role="option"]', 'Baby Shower').click(); // select 
        cy.get('input[type="file"]').attachFile('trial.png', { force: true });
        cy.contains('button[type="submit"]', 'Add Ecard').click();
    });
        it('All Rooms', ()=>{
        //view the list of ecards
         cy.get('svg.lucide-chevron-down').eq(0)
         cy.get('aside').should('be.visible');
         cy.contains('span.flex-1.truncate', 'Rooms').click();
         cy.get(':nth-child(1) > .gap-4 > .flex').click();
         cy.get('.flex').contains('Offer').click();
         //view the room
         cy.xpath('/html/body/div/div/main/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[6]/div/button[1]').click();
         cy.get('svg.lucide-x').click();

         
         //update the room details
         cy.get(':nth-child(1) > .text-right > .flex > :nth-child(2)').click();
         cy.get('.space-y-4 > :nth-child(1) > .flex').type('Testing 123');        
         cy.get('button[role="combobox"]').eq(1).click({ force: true });
         cy.contains('div[role="option"]', 'Offer').click({ force: true });  
         cy.get('textarea').clear().type('This is the perfect room for the students who are studing as its environment is better and good for the study and has 24 hours water supply and have peaceful nature');
         cy.get('.space-y-4 > :nth-child(4) > .flex').clear().type('200');
         cy.get('.space-y-4 > :nth-child(6) > .flex').clear().type('nsw');
         cy.get('.space-y-4 > :nth-child(7) > .flex').clear().type('Perth');
         cy.get('.space-y-4 > :nth-child(8) > .flex').clear().type('9845621356');
         cy.get('input[type="date"]').clear().type('2025-07-15');
         cy.contains('Update Room').click();

        
     });

    it('Admin', () => {
        //view the list of ecards
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.contains('span', 'Admin').parent().click({ force: true });
        cy.contains('span', 'Profile').parent().click({ force: true });
    });
    it('Logout', () => {
        //logout from the admin panel
        cy.get('svg.lucide-chevron-down').eq(0)
        cy.get('aside').should('be.visible');
        cy.contains('span', 'Admin').parent().click({ force: true });
        cy.contains('span', 'Log out').parent().click({ force: true });

    });
});