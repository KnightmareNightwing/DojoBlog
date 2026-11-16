# After pulling the code run the following commands
    - npm install
    - npx json-server --watch data/db.json --port 8000 (in on terminal)
    - npm run dev (in another terminal)

# Additional features
 1. The additional feature is to edit a blog. When a blog is selected it opens the home page. 
    In the details page there is an update button,
    once clicked a pre-filled form will open where the user can update the blog then save the updated details.
    The user then gets redirected to the home page.

    - When the user clicks the edit button, the user is redirected to /edit/:id.
    - The page is pre-populated by using useFetch and passing the blog id.
    - The form is only displayed when the data is received.
    - There is validation on the form; the save button is disabled if the validation is not passed.

2. Search filter by title on home page
   When the user enters a value in the search bar, the blog list is filterd by title.

    - A separate array is used to keep the filtered blogs.
    - The filtered arrary is passed to the BlogList component.

3. Filter by author on home page
   When a different author is selected on the dropdown list, the blog is also filtered by author.

   - The author filter is an and query check with the title, 
   - so both the selected author and the text from the title input field is used to filter the blog list.

4. Like counter
   On the details page, the blog can be liked when the button is clicked.

   - Each time the button is clicked, the counter increments by one.


