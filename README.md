# **Hello!This is the result of completing my test task! Here are some highlights for those who will be reviewing it:**

1. I organized the project structure so that it could be easily and conveniently expanded in the future, for example by adding new features in src/app/features or anything reusable in src/app/reusable.
2. I added a store to the project to cache data by a key formed from selected filter values and pagination, avoiding sending duplicate requests to load products that have already been loaded.
3. I integrated the Angular Material UI framework, but I don't use components from the library directly; instead, I wrap them in custom components.
4. I placed the product data in src/assets/products.json and connected it to the project using JSON server to simulate working with a real server. Unfortunately, this tool has limited capabilities, and for example, I cannot obtain only the total number of products to be used in pagination. Therefore, I made a small workaround in src/app/features/goods/goods.service.ts, which I marked with a comment.
5. That's all for now. In the future, I would like to add tests and modernize the table component to make it more flexible and allow configuring how I want to display rows.

# **Commands to run:**

1. "start" - start the project
2. "json-server" - start the server to fetch data from the JSON file

# **The project requirements:**

1. Data Source:
- Generate a mock dataset with at least 1000 records of fictional products. Each
product should have attributes such as name, category, price, and any other
relevant details.
2. Angular App:
- Create an Angular application with a clean and organised project structure.
3. Data Display:
- Display the dataset in a table format. Include pagination to handle a large
dataset. Each row should display product details.

4. Filtering:
- Implement advanced filtering options for users to refine the data.
- Include filters for product category, price range, and any additional criteria you
think are relevant.
- Use Angular Forms for the filtering interface.
5. Filter Logic:
- Implement a logic engine that handles the filters. The filtered data should update
in real-time as users adjust filter criteria.

6. Performance Optimisation:
- Optimise the application for performance, considering the large dataset. Ensure
that it remains responsive during filtering operations.

7. UI/UX:
- Design a user-friendly interface. Consider user experience in terms of ease of
use and aesthetics.

8. Complexity:
- Make the filtering logic as complex as you think is reasonable for this task to
showcase your problem-solving skills.
9. Testing(optional, but would be a plus):
- Write unit tests to ensure the correctness of the filtering logic.
10. Documentation(optional, but would be a plus):
- Provide brief documentation on how to run your application and any architectural
choices you made.
