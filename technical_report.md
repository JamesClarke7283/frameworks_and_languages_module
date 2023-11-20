Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### (name of Issue 1)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### (name of Issue 2)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)

# Notes

## Task 1: Code Analysis (1 hour)

### Server Analysis Questions (30 minutes)
- **Routing in `example_server`**:
  - Q1: Where is the routing handled in the `example_server`, and is this approach expandable? Provide a permalink to the relevant section.

  - A1: [Your answer here]
  In the `example_server`, routing is handled in the `app/server.py` file using a tuple named `ROUTES`. This tuple contains pairs of HTTP methods and URL patterns, each mapped to a corresponding handler function. While this manual regex pattern matching approach offers simplicity and ease of initial setup, it may not be ideal for scalability. As the application grows and routing rules become more intricate, maintaining and updating such a pattern-matching system can become complex and less efficient compared to more advanced routing mechanisms available in comprehensive web frameworks.
  
  `Permalink`: https://github.com/calaldees/frameworks_and_languages_module/blob/0cfd7c18081da94854f2a8423b12c39ac136d19a/example_server/app/server.py#L9

    
  - Q2: Where are the CORS headers set in the server code? Is this a good or bad approach, and why? Include a permalink.
    - A2: The CORS headers in the `example_server` are set in the `options_response` function. This function specifies the `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` headers, enabling certain HTTP methods and headers for cross-origin requests. This approach is practical for handling preflight requests in CORS scenarios, ensuring that the server can respond to requests from different origins. However, it's a basic implementation and might not be suitable for more complex applications where finer control over CORS policies is needed. For such cases, a more comprehensive and configurable CORS handling mechanism would be preferable.

    `Permalink`: https://github.com/calaldees/frameworks_and_languages_module/blob/0cfd7c18081da94854f2a8423b12c39ac136d19a/example_server/app/http_server.py#L71

  - Q3: Identify the weaknesses in the socket/network handling of the server. Provide a permalink to the relevant code section.
  The `app/http_server.py` in the `example_server` serves as a custom implementation of an HTTP server. This file, designed for educational purposes, reveals several weaknesses in its socket and network handling:

- A3:
1. **Lack of Robustness**: The implementation is basic and doesn't include the comprehensive features and optimizations found in standard HTTP server frameworks.

2. **Security Vulnerabilities**: Due to its simplicity, it likely lacks advanced security measures, making it prone to potential exploits.

3. **Scalability Issues**: The server might not handle high traffic or complex network scenarios efficiently. 
The respone types are not comprehensive:
https://github.com/calaldees/frameworks_and_languages_module/blob/0cfd7c18081da94854f2a8423b12c39ac136d19a/example_server/app/http_server.py#L52

4. **Maintenance Challenges**: Custom implementations require ongoing maintenance and updates, especially for security, which can be more effectively managed with established frameworks.

In summary, while `app/http_server.py` is useful for learning, its limitations make it unsuitable for production environments.

    
  - Q4: What features are missing in `example_server` compared to standard framework features?
    - A4: [Your answer here]

### Client Analysis Questions (30 minutes)
- **Investigating `example_client`**:
  - Q5: Locate and describe an item of state, an action, and a view in the `example_client`. How effective is the client's data storage approach? Provide permalinks for each.
    - A5: [Your answer here]
  - Q6: Discuss why the `example_client` might be difficult to follow, read, or understand.
    - A6: [Your answer here]
  - Q7: What is the purpose of `renderItemListFieldLookup` in the client code?
    - A7: [Your answer here]
  - Q8: Explain the use and function of `.cloneNode(true)` in the context of the client.
    - A8: [Your answer here]

## Task 2: Drafting and Feedback (1 hour)

### Drafting and Discussion Questions
- **Report Writing**:
  - Q9: Draft your initial thoughts and answers for the above questions in `technical_report.md`.
    - A9: [Your draft here]
- **Feedback Session**:
  - Q10: Discuss the feedback received from the teacher on your draft. What were the key takeaways?
    - A10: [Your feedback summary here]

## Additional Insights
- Q11: Why is the use of `http_server.py` considered redundant in this context? Refer to the relevant Python documentation.
  - A11: [Your answer here, referencing Python's HTTP Server, WSGI Reference, and WSGI Environment Dictionary Tutorial]

  # Client

1. **Item of State**: 
   - The state, particularly items, seems to be managed within the `<div data-page="items"><ul></ul></div>` structure. However, the code doesn't clearly separate state management from the view, leading to potential issues in state tracking and manipulation.

2. **Action (Button Press Logic)**:
   - An example of an action is the delete button: `<button data-action="delete">delete</button>`. This likely triggers deletion logic when clicked.

3. **View (View Logic)**:
   - The view appears to be managed inline, such as in the `<div data-page="items">` block, where item details are displayed. However, without a clear separation of concerns, the view logic is intermingled with other code, making it less readable and maintainable.

4. **Difficulty in Following/Understanding**:
   - The client code is difficult to follow due to a lack of clear structure, separation of concerns, and use of inline scripting. Without frameworks or clear architectural patterns, the logic becomes intertwined and harder to decipher.

5. **Purpose of `renderItemListFieldLookup`**:
   The `renderItemListFieldLookup` function in the `example_client` serves as a mapping between item properties and their rendering logic. It's an object where each property (like `image`, `user_id`, `keywords`, `date_from`) is associated with a function that updates the DOM elements (`$el`) based on the property's value (`v`). This approach allows for a modular way to render different aspects of an item in the list, with each function tailored to handle the rendering of a specific type of data, like setting the source for images or appending keywords as list items.

6. **Function of `.cloneNode(true)`**:
   - The `.cloneNode(true)` method in JavaScript is used to clone a node and its entire subtree (when true is passed). It appears this method might be used to duplicate elements for dynamic rendering, although its specific use is not shown in the document.

The code in `example_client` demonstrates typical challenges faced when not using a client framework, such as convoluted state management, unclear separation between view and logic, and potentially inefficient DOM manipulations.