export type Category = 'web' | 'math' | 'general';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export const questions: Question[] = [
  // Web - Easy
  { id: 'w-e-1', category: 'web', difficulty: 'easy', question: 'What does HTML stand for?', correctAnswer: 'HyperText Markup Language', incorrectAnswers: ['HyperText Machine Language', 'HyperTransfer Markup Language', 'HighText Markup Language'] },
  { id: 'w-e-2', category: 'web', difficulty: 'easy', question: 'What does CSS stand for?', correctAnswer: 'Cascading Style Sheets', incorrectAnswers: ['Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'] },
  { id: 'w-e-3', category: 'web', difficulty: 'easy', question: 'What is a browser?', correctAnswer: 'A software application for accessing information on the World Wide Web', incorrectAnswers: ['A piece of hardware that connects you to the internet', 'A search engine', 'A programming language'] },
  { id: 'w-e-4', category: 'web', difficulty: 'easy', question: 'Which HTML tag is used for the largest heading?', correctAnswer: '<h1>', incorrectAnswers: ['<h6>', '<header>', '<heading>'] },
  { id: 'w-e-5', category: 'web', difficulty: 'easy', question: 'What does JS stand for?', correctAnswer: 'JavaScript', incorrectAnswers: ['JavaSource', 'JustScript', 'JellyScript'] },
  { id: 'w-e-6', category: 'web', difficulty: 'easy', question: 'Which HTML tag is used to define an unordered list?', correctAnswer: '<ul>', incorrectAnswers: ['<ol>', '<list>', '<li>'] },
  { id: 'w-e-7', category: 'web', difficulty: 'easy', question: 'Which HTML attribute specifies an alternate text for an image?', correctAnswer: 'alt', incorrectAnswers: ['title', 'src', 'desc'] },
  { id: 'w-e-8', category: 'web', difficulty: 'easy', question: 'Which CSS property controls the text size?', correctAnswer: 'font-size', incorrectAnswers: ['text-size', 'font-style', 'text-style'] },
  { id: 'w-e-9', category: 'web', difficulty: 'easy', question: 'In HTML, which attribute is used to specify that an input field must be filled out?', correctAnswer: 'required', incorrectAnswers: ['placeholder', 'validate', 'important'] },
  { id: 'w-e-10', category: 'web', difficulty: 'easy', question: 'What is the correct HTML element for inserting a line break?', correctAnswer: '<br>', incorrectAnswers: ['<break>', '<lb>', '<newline>'] },
  // Web - Medium
  { id: 'w-m-1', category: 'web', difficulty: 'medium', question: 'What is a React Hook?', correctAnswer: 'A function that lets you hook into React state and lifecycle features', incorrectAnswers: ['A class component method', 'A way to attach an external library', 'A CSS styling approach'] },
  { id: 'w-m-2', category: 'web', difficulty: 'medium', question: 'What does REST stand for?', correctAnswer: 'Representational State Transfer', incorrectAnswers: ['Remote Server Transfer', 'Request State Transfer', 'Reliable Server Technology'] },
  { id: 'w-m-3', category: 'web', difficulty: 'medium', question: 'Which CSS selector has the highest specificity?', correctAnswer: 'Inline styles', incorrectAnswers: ['ID selector', 'Class selector', 'Tag selector'] },
  { id: 'w-m-4', category: 'web', difficulty: 'medium', question: 'What does the await keyword do in JavaScript?', correctAnswer: 'Pauses the async function execution until a Promise is settled', incorrectAnswers: ['Stops all JavaScript execution', 'Creates a new Promise', 'Makes a function run faster'] },
  { id: 'w-m-5', category: 'web', difficulty: 'medium', question: 'What is event bubbling?', correctAnswer: 'When an event triggers on the deepest target element and then triggers on its ancestors', incorrectAnswers: ['When multiple events happen at once', 'When an event triggers only on the document root', 'When an event gets cancelled immediately'] },
  { id: 'w-m-6', category: 'web', difficulty: 'medium', question: 'Which hook is used to perform side effects in a React functional component?', correctAnswer: 'useEffect', incorrectAnswers: ['useState', 'useSideEffect', 'useContext'] },
  { id: 'w-m-7', category: 'web', difficulty: 'medium', question: 'In CSS, what is the default position value of an element?', correctAnswer: 'static', incorrectAnswers: ['relative', 'absolute', 'fixed'] },
  { id: 'w-m-8', category: 'web', difficulty: 'medium', question: 'What does the JSON.stringify() method do?', correctAnswer: 'Converts a JavaScript object or value to a JSON string', incorrectAnswers: ['Parses a JSON string', 'Converts a JSON string to an object', 'Validates JSON syntax'] },
  { id: 'w-m-9', category: 'web', difficulty: 'medium', question: 'What is the purpose of the Array.prototype.map() method?', correctAnswer: 'Creates a new array populated with the results of calling a provided function on every element', incorrectAnswers: ['Modifies the original array', 'Filters out unwanted elements', 'Reduces the array to a single value'] },
  { id: 'w-m-10', category: 'web', difficulty: 'medium', question: 'What is CORS?', correctAnswer: 'Cross-Origin Resource Sharing', incorrectAnswers: ['Cross-Object Resource System', 'Centralized Origin Request System', 'Content Object Routing System'] },
  // Web - Hard
  { id: 'w-h-1', category: 'web', difficulty: 'hard', question: 'What is a closure in JavaScript?', correctAnswer: 'A function bundled together with references to its surrounding state', incorrectAnswers: ['A way to end a loop', 'A private variable', 'A way to close an HTML tag'] },
  { id: 'w-h-2', category: 'web', difficulty: 'hard', question: 'What is the prototype chain?', correctAnswer: 'The mechanism by which JavaScript objects inherit features from one another', incorrectAnswers: ['A series of connected HTML elements', 'A way to chain Promises together', 'A CSS selector syntax'] },
  { id: 'w-h-3', category: 'web', difficulty: 'hard', question: 'What is the primary purpose of a Service Worker?', correctAnswer: 'To act as a proxy server between web applications, the browser, and the network', incorrectAnswers: ['To render 3D graphics', 'To manage database connections', 'To parse JSON data'] },
  { id: 'w-h-4', category: 'web', difficulty: 'hard', question: 'Which protocol do WebSockets use for the initial connection?', correctAnswer: 'HTTP', incorrectAnswers: ['TCP', 'UDP', 'FTP'] },
  { id: 'w-h-5', category: 'web', difficulty: 'hard', question: 'How does React\'s virtual DOM diffing algorithm work generally?', correctAnswer: 'It compares the new virtual DOM with the old virtual DOM and updates only the changed parts in the real DOM', incorrectAnswers: ['It completely recreates the DOM on every state change', 'It relies on the browser to detect changes', 'It directly modifies the HTML file'] },
  { id: 'w-h-6', category: 'web', difficulty: 'hard', question: 'What is the difference between macro-tasks and micro-tasks in the JS Event Loop?', correctAnswer: 'Micro-tasks are executed before the next macro-task begins', incorrectAnswers: ['Macro-tasks execute faster', 'Micro-tasks only handle UI updates', 'There is no difference'] },
  { id: 'w-h-7', category: 'web', difficulty: 'hard', question: 'What is HTTP Strict Transport Security (HSTS)?', correctAnswer: 'A policy that informs browsers to only interact with the server using HTTPS', incorrectAnswers: ['A way to encrypt passwords', 'A new HTTP version', 'A caching strategy'] },
  { id: 'w-h-8', category: 'web', difficulty: 'hard', question: 'What does the CSS property `contain: strict;` do?', correctAnswer: 'Indicates that the element is totally independent of the rest of the document', incorrectAnswers: ['Hides overflowing content strictly', 'Prevents CSS variables from leaking', 'Forces strict parsing of CSS'] },
  { id: 'w-h-9', category: 'web', difficulty: 'hard', question: 'In React, what is the purpose of `useInsertionEffect`?', correctAnswer: 'To fire synchronously before all DOM mutations', incorrectAnswers: ['To insert elements into the DOM', 'To replace useEffect for animations', 'To measure DOM node sizes'] },
  { id: 'w-h-10', category: 'web', difficulty: 'hard', question: 'What is a WebAssembly (Wasm) module?', correctAnswer: 'A binary instruction format designed as a portable compilation target', incorrectAnswers: ['A new JavaScript framework', 'A CSS preprocessor', 'A specific browser API'] },

  // Math - Easy
  { id: 'm-e-1', category: 'math', difficulty: 'easy', question: 'What is 5 + 7?', correctAnswer: '12', incorrectAnswers: ['11', '13', '10'] },
  { id: 'm-e-2', category: 'math', difficulty: 'easy', question: 'How many degrees are in a circle?', correctAnswer: '360', incorrectAnswers: ['180', '90', '400'] },
  { id: 'm-e-3', category: 'math', difficulty: 'easy', question: 'What is the square root of 81?', correctAnswer: '9', incorrectAnswers: ['8', '7', '10'] },
  { id: 'm-e-4', category: 'math', difficulty: 'easy', question: 'How many sides does a hexagon have?', correctAnswer: '6', incorrectAnswers: ['5', '7', '8'] },
  { id: 'm-e-5', category: 'math', difficulty: 'easy', question: 'What is 15 divided by 3?', correctAnswer: '5', incorrectAnswers: ['4', '6', '3'] },
  { id: 'm-e-6', category: 'math', difficulty: 'easy', question: 'What is the top number of a fraction called?', correctAnswer: 'Numerator', incorrectAnswers: ['Denominator', 'Divisor', 'Quotient'] },
  { id: 'm-e-7', category: 'math', difficulty: 'easy', question: 'What is 10% of 100?', correctAnswer: '10', incorrectAnswers: ['1', '100', '5'] },
  { id: 'm-e-8', category: 'math', difficulty: 'easy', question: 'What is the next prime number after 7?', correctAnswer: '11', incorrectAnswers: ['9', '13', '8'] },
  { id: 'm-e-9', category: 'math', difficulty: 'easy', question: 'How many millimeters are in a centimeter?', correctAnswer: '10', incorrectAnswers: ['100', '1', '1000'] },
  { id: 'm-e-10', category: 'math', difficulty: 'easy', question: 'What is 3 squared?', correctAnswer: '9', incorrectAnswers: ['6', '27', '12'] },
  // Math - Medium
  { id: 'm-m-1', category: 'math', difficulty: 'medium', question: 'If 2x + 5 = 15, what is x?', correctAnswer: '5', incorrectAnswers: ['4', '6', '10'] },
  { id: 'm-m-2', category: 'math', difficulty: 'medium', question: 'What is the Pythagorean theorem?', correctAnswer: 'a² + b² = c²', incorrectAnswers: ['a + b = c', 'a² - b² = c²', 'E = mc²'] },
  { id: 'm-m-3', category: 'math', difficulty: 'medium', question: 'What is the sum of the interior angles of a triangle?', correctAnswer: '180 degrees', incorrectAnswers: ['360 degrees', '90 degrees', '270 degrees'] },
  { id: 'm-m-4', category: 'math', difficulty: 'medium', question: 'What is the value of Pi to two decimal places?', correctAnswer: '3.14', incorrectAnswers: ['3.15', '3.16', '3.12'] },
  { id: 'm-m-5', category: 'math', difficulty: 'medium', question: 'What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, ...?', correctAnswer: '21', incorrectAnswers: ['20', '22', '34'] },
  { id: 'm-m-6', category: 'math', difficulty: 'medium', question: 'Solve for y: y/4 = 7', correctAnswer: '28', incorrectAnswers: ['11', '3', '24'] },
  { id: 'm-m-7', category: 'math', difficulty: 'medium', question: 'What is the area of a rectangle with length 8 and width 5?', correctAnswer: '40', incorrectAnswers: ['13', '26', '45'] },
  { id: 'm-m-8', category: 'math', difficulty: 'medium', question: 'If a shirt costs $40 and is 25% off, what is the discount amount?', correctAnswer: '$10', incorrectAnswers: ['$25', '$30', '$15'] },
  { id: 'm-m-9', category: 'math', difficulty: 'medium', question: 'What is the probability of rolling a 4 on a standard six-sided die?', correctAnswer: '1/6', incorrectAnswers: ['1/4', '1/3', '1/2'] },
  { id: 'm-m-10', category: 'math', difficulty: 'medium', question: 'What is the log base 10 of 100?', correctAnswer: '2', incorrectAnswers: ['10', '1', '100'] },
  // Math - Hard
  { id: 'm-h-1', category: 'math', difficulty: 'hard', question: 'What is the derivative of x²?', correctAnswer: '2x', incorrectAnswers: ['x', '2', 'x³'] },
  { id: 'm-h-2', category: 'math', difficulty: 'hard', question: 'How many combinations are there to choose 2 items from a set of 5?', correctAnswer: '10', incorrectAnswers: ['20', '5', '15'] },
  { id: 'm-h-3', category: 'math', difficulty: 'hard', question: 'What is the integral of 2x dx?', correctAnswer: 'x² + C', incorrectAnswers: ['2x²', 'x² / 2', '2'] },
  { id: 'm-h-4', category: 'math', difficulty: 'hard', question: 'What is Euler\'s number (e) approximately equal to?', correctAnswer: '2.718', incorrectAnswers: ['3.141', '1.618', '0.577'] },
  { id: 'm-h-5', category: 'math', difficulty: 'hard', question: 'What is the determinant of a matrix that is not invertible?', correctAnswer: '0', incorrectAnswers: ['1', '-1', 'Infinity'] },
  { id: 'm-h-6', category: 'math', difficulty: 'hard', question: 'What does a Taylor series expansion do?', correctAnswer: 'Represents a function as an infinite sum of terms calculated from its derivatives at a single point', incorrectAnswers: ['Solves differential equations directly', 'Calculates prime numbers', 'Finds roots of polynomials'] },
  { id: 'm-h-7', category: 'math', difficulty: 'hard', question: 'In topology, what is the Euler characteristic of a sphere?', correctAnswer: '2', incorrectAnswers: ['0', '1', '4'] },
  { id: 'm-h-8', category: 'math', difficulty: 'hard', question: 'What is the limit of (sin x) / x as x approaches 0?', correctAnswer: '1', incorrectAnswers: ['0', 'Infinity', '-1'] },
  { id: 'm-h-9', category: 'math', difficulty: 'hard', question: 'Which hypothesis states that every simply connected, closed 3-manifold is homeomorphic to the 3-sphere?', correctAnswer: 'Poincaré conjecture', incorrectAnswers: ['Riemann hypothesis', 'Collatz conjecture', 'Goldbach conjecture'] },
  { id: 'm-h-10', category: 'math', difficulty: 'hard', question: 'What is the square root of -1?', correctAnswer: 'i', incorrectAnswers: ['-1', '1', 'undefined'] },

  // Gen Knowledge - Easy
  { id: 'g-e-1', category: 'general', difficulty: 'easy', question: 'What is the capital of France?', correctAnswer: 'Paris', incorrectAnswers: ['London', 'Berlin', 'Madrid'] },
  { id: 'g-e-2', category: 'general', difficulty: 'easy', question: 'Who is known for inventing the lightbulb?', correctAnswer: 'Thomas Edison', incorrectAnswers: ['Nikola Tesla', 'Albert Einstein', 'Alexander Graham Bell'] },
  { id: 'g-e-3', category: 'general', difficulty: 'easy', question: 'What is the largest planet in our solar system?', correctAnswer: 'Jupiter', incorrectAnswers: ['Earth', 'Mars', 'Saturn'] },
  { id: 'g-e-4', category: 'general', difficulty: 'easy', question: 'How many continents are there?', correctAnswer: '7', incorrectAnswers: ['6', '5', '8'] },
  { id: 'g-e-5', category: 'general', difficulty: 'easy', question: 'What is the boiling point of water in Celsius?', correctAnswer: '100', incorrectAnswers: ['0', '50', '212'] },
  { id: 'g-e-6', category: 'general', difficulty: 'easy', question: 'Which animal is known as the "King of the Jungle"?', correctAnswer: 'Lion', incorrectAnswers: ['Tiger', 'Elephant', 'Gorilla'] },
  { id: 'g-e-7', category: 'general', difficulty: 'easy', question: 'What is the closest star to Earth?', correctAnswer: 'The Sun', incorrectAnswers: ['Sirius', 'Alpha Centauri', 'Proxima Centauri'] },
  { id: 'g-e-8', category: 'general', difficulty: 'easy', question: 'In what year did the Titanic sink?', correctAnswer: '1912', incorrectAnswers: ['1905', '1920', '1898'] },
  { id: 'g-e-9', category: 'general', difficulty: 'easy', question: 'Which color is not a primary color?', correctAnswer: 'Green', incorrectAnswers: ['Red', 'Blue', 'Yellow'] },
  { id: 'g-e-10', category: 'general', difficulty: 'easy', question: 'How many days are in a leap year?', correctAnswer: '366', incorrectAnswers: ['365', '364', '367'] },
  // Gen Knowledge - Medium
  { id: 'g-m-1', category: 'general', difficulty: 'medium', question: 'Who painted the Mona Lisa?', correctAnswer: 'Leonardo da Vinci', incorrectAnswers: ['Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'] },
  { id: 'g-m-2', category: 'general', difficulty: 'medium', question: 'What is the longest river in the world?', correctAnswer: 'The Nile', incorrectAnswers: ['The Amazon', 'The Mississippi', 'The Yangtze'] },
  { id: 'g-m-3', category: 'general', difficulty: 'medium', question: 'In what year did World War II end?', correctAnswer: '1945', incorrectAnswers: ['1941', '1939', '1948'] },
  { id: 'g-m-4', category: 'general', difficulty: 'medium', question: 'What is the hardest natural substance on Earth?', correctAnswer: 'Diamond', incorrectAnswers: ['Gold', 'Iron', 'Quartz'] },
  { id: 'g-m-5', category: 'general', difficulty: 'medium', question: 'Who wrote the play "Romeo and Juliet"?', correctAnswer: 'William Shakespeare', incorrectAnswers: ['Charles Dickens', 'Jane Austen', 'Mark Twain'] },
  { id: 'g-m-6', category: 'general', difficulty: 'medium', question: 'What element does "O" represent on the periodic table?', correctAnswer: 'Oxygen', incorrectAnswers: ['Osmium', 'Oganesson', 'Oxide'] },
  { id: 'g-m-7', category: 'general', difficulty: 'medium', question: 'Which country is home to the kangaroo?', correctAnswer: 'Various countries in Africa (Wait, no) - Actually, no, kangaroos are from Australia', incorrectAnswers: ['South Africa', 'Brazil', 'India'] }, // Wait, editing below
  { id: 'g-m-8', category: 'general', difficulty: 'medium', question: 'What is the currency of Japan?', correctAnswer: 'Yen', incorrectAnswers: ['Yuan', 'Won', 'Ringgit'] },
  { id: 'g-m-9', category: 'general', difficulty: 'medium', question: 'Who was the 16th US President?', correctAnswer: 'Abraham Lincoln', incorrectAnswers: ['George Washington', 'Thomas Jefferson', 'Theodore Roosevelt'] },
  { id: 'g-m-10', category: 'general', difficulty: 'medium', question: 'What is the largest mammal in the world?', correctAnswer: 'Blue Whale', incorrectAnswers: ['Elephant', 'Giraffe', 'Hippopotamus'] },
  // Gen Knowledge - Hard
  { id: 'g-h-1', category: 'general', difficulty: 'hard', question: 'Which king of England was known as the "Lionheart"?', correctAnswer: 'Richard I', incorrectAnswers: ['Henry VIII', 'William the Conqueror', 'Edward I'] },
  { id: 'g-h-2', category: 'general', difficulty: 'hard', question: 'What is the most abundant gas in the Earth\'s atmosphere?', correctAnswer: 'Nitrogen', incorrectAnswers: ['Oxygen', 'Carbon Dioxide', 'Hydrogen'] },
  { id: 'g-h-3', category: 'general', difficulty: 'hard', question: 'Who wrote "One Hundred Years of Solitude"?', correctAnswer: 'Gabriel García Márquez', incorrectAnswers: ['Mario Vargas Llosa', 'Jorge Luis Borges', 'Isabel Allende'] },
  { id: 'g-h-4', category: 'general', difficulty: 'hard', question: 'In what year was the first exoplanet discovered orbiting a main-sequence star?', correctAnswer: '1995', incorrectAnswers: ['1988', '2001', '1990'] },
  { id: 'g-h-5', category: 'general', difficulty: 'hard', question: 'What is the capital of Mongolia?', correctAnswer: 'Ulaanbaatar', incorrectAnswers: ['Astana', 'Bishkek', 'Tashkent'] },
  { id: 'g-h-6', category: 'general', difficulty: 'hard', question: 'Who discovered penicillin?', correctAnswer: 'Alexander Fleming', incorrectAnswers: ['Louis Pasteur', 'Marie Curie', 'Joseph Lister'] },
  { id: 'g-h-7', category: 'general', difficulty: 'hard', question: 'What is the smallest country in the world by land area?', correctAnswer: 'Vatican City', incorrectAnswers: ['Monaco', 'San Marino', 'Liechtenstein'] },
  { id: 'g-h-8', category: 'general', difficulty: 'hard', question: 'Which philosopher said "I think, therefore I am"?', correctAnswer: 'René Descartes', incorrectAnswers: ['Socrates', 'Plato', 'Immanuel Kant'] },
  { id: 'g-h-9', category: 'general', difficulty: 'hard', question: 'What is the chemical symbol for Tungsten?', correctAnswer: 'W', incorrectAnswers: ['Tu', 'Tn', 'Tg'] },
  { id: 'g-h-10', category: 'general', difficulty: 'hard', question: 'Who directed the movie "Seven Samurai"?', correctAnswer: 'Akira Kurosawa', incorrectAnswers: ['Hayao Miyazaki', 'Yasujirō Ozu', 'Kenji Mizoguchi'] }
];
