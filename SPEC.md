# MediCare

<!-- Exercise 2. Write the non-goals first. Every acceptance criterion must be checkable in under a minute.
     Keep these headings exactly as they are: the self-checks look for them by name.
     The full target is on the course site under Resources → The course project. -->

## Project option
Medical Center Information System

## Goals
- G-1: Provide a fully functional role-based web portal where patients can register, browse doctors by department, and book/cancel appointments.
- G-2: Enable doctors and administrators to manage working schedules, appointment slots, and staff approvals through dedicated dashboards.
- G-3: Expose core appointment and doctor services via an MCP server with identical authorization rules as the HTTP API.

## Non-goals
- Real-time patient-doctor messaging/chat or video consulation rooms.
- Electronic Health Records (EHR) / prescription management or lab result tracing.
- Mobile application. One web UI that also works on mobile screen.

## Constraints
- C-1: 100% test coverage on the service layer and at least 80% overall test coverage enforced in CI.
- C-2: All database operations must be executed exclusively through the service and data access layers, with no direct database access from route handlers or MCP tools.
- C-3: The application must run on Node.js/Express with Sequelize/MySQL for the backend and React with vanilla CSS/Vite for the frontend.

## The model feature
<!-- Which model, which modality, and what it does for a user.
     Name three things or the check fails: the input it receives, the output it produces,
     and what happens when the model is slow, rate-limited or wrong. -->
- Model:
- Input:
- Output:
- When it fails:

## Auth
<!-- Local sign-in plus at least one provider. Say how an account signing in both ways stays one account. -->
- Local:
- Provider:
- Linking:

## MCP tools
<!-- At least three tools your own MCP server exposes over this project's data.
     Each tool calls the same service functions the HTTP API calls, so the same rules apply.
     A description shorter than 20 characters is not a description. -->
| Tool | What it does | Who may call it |
| --- | --- | --- |
|  |  |  |

## UI
<!-- Stack, and the three or more screens. The graded checklist lives in docs/UI.md. -->

## Architecture
<!-- Exercise 3. One request traced through every layer, naming the file for each one,
     plus one place where your own code does not match this layering. -->

## Acceptance criteria
<!-- Every criterion carries an id. A test proves it by naming that id in its title, for example
     test('AC-3 a booking that overlaps another is refused with 409', ...).
     Say who acts, what they see, and what must be true in the database. -->
- [AC-1] A patient who attempts to book an appointment with a doctor during an already reserved time slot sees an error message "Time slot
    is already booked", and no new row appears in the Appointments table.
- [AC-2] A guest user who navigates to /dashboard without authenticating lands on /login instead.
- [AC-3] An administrator who clicks "Approve" on a pending doctor registration sees the doctor listed as active in the UI, and isActive
    is set to true in the Doctors table.
- [AC-4] A patient who cancels their upcoming appointment sees it disappear from their upcoming appointments list, and its status updates
    to cancelled in the Appointments table.
- [AC-5] A doctor who configures a weekly working schedule with specific start and end times sees those time slots rendered on their
    schedule view, and corresponding records are created in the DoctorSchedules table. 
- [AC-6] A user who registers with email and password receives a verification token, and upon clicking the verification link sees a
    success message while isVerified becomes true in the Users table.
- [AC-7] An authenticated user who invokes the MCP tool get_doctors_list receives a JSON array of all active doctors matching the database
    records without hitting the HTTP layer.
- [AC-8] A patient who submits a prompt to the AI health assistant feature with a symptom description receives a categorized triage
    recommendation, and the interaction log is recorded in the session database.

### Slice 1: sign-in and doctors list
- [AC-9] A visitor who opens /doctors/:id and tries to book an appointment without signing in is promted a message to login.
- [AC-10] After signing in with a seeded patient account, /doctors shows the seeded doctors, each with their name, specialty, department,
    and profile picture.
- [AC-11] Deleting one doctor row in the database and reloading /doctors removes that doctor card from the screen.

## Traceability
<!-- Filled in from Exercise 3 onward: each AC id, and the test that names it. -->
| Criterion | Test |
| --- | --- |
| AC-1 |  |

## Spec vs result
<!-- After the agent builds the slice: which criteria passed, which it missed or reinterpreted, and what you changed in this spec because of it. -->
