








03 TRPC setup
set up trpc v11
create a procedure with Prisma API
explore TRPC client-side 
Explore TRPC server-side
Explore TRPC server + client(prefetch)

-push to github
create a new branch
create a new PR
Review & merge

04 Authentication

setup betterAuth
Add auth screens
Add authn procedures(trpc)
-push to github
create a new branch
create a new PR
Review & merge


05 Theme & styling

Apply new theme 
Improve auth screens 
add logos -> use logoipsum
-push to github
create a new branch
create a new PR
Review & merge

06 Background jobs 

-setup Inngest
create a background job
-add mprocs to run the job
-push to github
create a new branch
create a new PR
Review & merge


07 AI providers

Choose AI model(s)
-Gemini(free)
openAI(min $5)
-anthropic(min $5)
-....

setup AI SDK
-use AI with inngest

-push to github
create a new branch
create a new PR
review & merge


08 Error tracking 

-setup sentry
npm install @sentry/nextjs --save
-demonstrate error tracking
  -session replays
  -logs
  -ai monitoring

-push to github
create a new branch
create a new PR
review & merge


09 Sidebar Layout
- Improve file structure
- create placeholder routes 
- create sidebar layout
- push to github
- create a new branch
- create a new PR
- review & merge


10 Payments 
 
 - Setup Polar
 - Integrate with better Auth
 - Create checkout 
 - create billing portal
 
 - push to github
  - create a new branch
  - create a new PR
  - review & merge

11 Workflows CRUD

- Update workflow schema
- Create workflow APIs
  -create
  -Read
  -Update
  -Delete
  
- Push to github
- Create a new branch
- Create a new PR
- Review & merge


12 Workflow Pagination 
- update "get many" procedure
- Add NUQS for param handling
    -client side 
    -server side

-Add "entity" components
-Add UI for pagination
-Add UI for search 

-push to github
create a new branch
create a new PR
Review & merge


13 Workflow UI

- create UI Components
   -loading 
   -error
   -empty
   -list
   -item

-push to github
create a new branch
create a new PR
Review & merge

14 Workflow Page
   -Load workflow page by id
   -prefetch
   -useSuspenseQuery
   -loading
   -error 

 -create "WorflowHeader" component
    -update workflow name

-push to github
create a new branch
create a new PR
Review & merge


15 Editor

   -Create "Editor" component
     -Add react-flow
     -Add initial nodes
  -update schema 
    -Add "Node" table
    -Add "connection" table

  -Load default editor state 

-push to github
create a new branch   
create a new PR
Review & merge


16 Node selector 

   -Add "maual trigger" node
   -Add "http request" node 
   -Create node selector component
   -Add editor state 
   -enable editor save functiopnality

   -push to github
   -create a new branch
   -create a new PR
   -Review & merge



17 Editor state
   -Add save functionality
   -Add delete functionality
   -Add settings functionality

   -push to github
   -create a new branch
   -create a new PR
   -Review & merge

18 Node Execution

-imporve props for dialog

- shiw "execute" button
- create "execute" inngest function 
- Topology sort 
- create executor registory 

-push to github
create a new branch
create a new PR
Review & merge

19 Node Variables
   - fix codeRabbit issue
   - contentType header
   -"cyclic" error message

   -Fix key collision
     - add "variableName" to UI 
     - Use "variableName" in context

   -push to github
   -create a new branch
   -create a new PR
   -Review & merge

20 Node Templating 
  -refactor "variableName" in executor 
  - Implement templating systax
    - Allow dynamic body 
    - Allow dynamic endpoint 

  -push to github
  -create a new branch
  -create a new PR
  -Review & merge

21 Node realtime 
   - Add @inngest/realtime
   - create "httpRequest" channel
   - Publish events (loading, error, success)
   - capture events "useNodeStatus"

   -push to github
   -create a new branch
   -create a new PR
   -Review & merge

   
22 Google form trigger 
   - Add Google from trigger node
     - node 
     - dialog
     - executor
     - realtime channel
     - webhook

 - Create a google form 
  - create a new "App Script"

- push to github
  - create a new branch
  - create a new PR
  - Review & merge