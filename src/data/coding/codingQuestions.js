/**
 * Dedicated coding interview questions with full 5-part answers + complete solutions.
 */
function C(id, title, howItWorks, code, extra = {}) {
  const {
    definition = `${title} — a common JavaScript coding question in frontend interviews.`,
    tradeoffs = extra.tradeoffs || 'In production use built-in methods when appropriate; in interviews write clear logic and mention time/space complexity.',
    realExample = extra.realExample || 'I solved this in interview prep and used the same pattern in a React project when transforming list data before rendering tables or filters.',
    seniorGrowth = extra.seniorGrowth || 'Today I would write the manual solution in interviews, then mention the built-in or library shortcut if the interviewer allows.',
    output,
    tips,
    complexity,
  } = extra;

  return {
    id,
    title,
    tags: ['Coding'],
    definition,
    howItWorks: complexity ? `${howItWorks} ${complexity}` : howItWorks,
    tradeoffs,
    realExample,
    seniorGrowth,
    code,
    exampleCode: code,
    output,
    tips,
  };
}

export const codingStringProblems = [
  C('coding-reverse-string', 'Reverse a String',
    'Split into array of characters, reverse, join back. Or loop from end and build new string.',
    `function reverseString(str) {
  return str.split('').reverse().join('');
}

// Manual: let out = ''; for (let i = str.length - 1; i >= 0; i--) out += str[i];`,
    { complexity: 'Time O(n), Space O(n).' }),

  C('coding-palindrome', 'Check if a String is a Palindrome',
    'Normalize (lowercase, remove spaces), compare with reversed version.',
    `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/\\s/g, '');
  return clean === clean.split('').reverse().join('');
}`,
    { complexity: 'Time O(n), Space O(n).' }),

  C('coding-remove-dup-string', 'Remove Duplicates from a String',
    'Use Set to keep unique characters, join back to string.',
    `function removeDuplicates(str) {
  return [...new Set(str)].join('');
}`,
    { complexity: 'Time O(n), Space O(n).' }),

  C('coding-first-non-repeating', 'Find the First Non-Repeating Character',
    'First pass: count frequency. Second pass: return first char with count 1.',
    `function firstNonRepeating(str) {
  const map = {};
  for (const ch of str) map[ch] = (map[ch] || 0) + 1;
  for (const ch of str) if (map[ch] === 1) return ch;
  return null;
}`,
    { output: '"success" → "c"' }),

  C('coding-char-count', 'Count Character Occurrences',
    'Loop each character and increment count in an object map.',
    `function charCount(str) {
  return [...str].reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
}`,
    { tips: 'See /practice/character-occurrence for live demo.' }),

  C('coding-reverse-words', 'Reverse Words in a Sentence',
    'Split by spaces, reverse array, join with space.',
    `function reverseWords(sentence) {
  return sentence.trim().split(/\\s+/).reverse().join(' ');
}`,
    { output: '"hello world" → "world hello"' }),

  C('coding-anagrams', 'Check if Two Strings are Anagrams',
    'Sort both strings and compare. Or count chars — both must match.',
    `function areAnagrams(a, b) {
  const sort = (s) => s.toLowerCase().split('').sort().join('');
  return sort(a) === sort(b);
}`,
    { complexity: 'Sort approach: Time O(n log n).' }),

  C('coding-longest-substring', 'Longest Substring Without Repeating Characters',
    'Sliding window with Set. Expand right, shrink left when duplicate found.',
    `function lengthOfLongestSubstring(str) {
  let max = 0, left = 0;
  const set = new Set();
  for (let right = 0; right < str.length; right++) {
    while (set.has(str[right])) {
      set.delete(str[left++]);
    }
    set.add(str[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
    { complexity: 'Time O(n), Space O(min(n, charset)).' }),

  C('coding-atoi', 'Convert String to Integer (atoi)',
    'Skip spaces, read sign, parse digits until non-digit. Clamp to 32-bit range if asked.',
    `function atoi(str) {
  let i = 0, sign = 1, num = 0;
  while (str[i] === ' ') i++;
  if (str[i] === '-') { sign = -1; i++; }
  else if (str[i] === '+') i++;
  while (i < str.length && str[i] >= '0' && str[i] <= '9') {
    num = num * 10 + (str[i] - '0');
    i++;
  }
  return sign * num;
}`),

  C('coding-most-frequent-char', 'Find the Most Frequent Character',
    'Count map, track char with highest count.',
    `function mostFrequentChar(str) {
  const map = {};
  let best = '', max = 0;
  for (const ch of str) {
    map[ch] = (map[ch] || 0) + 1;
    if (map[ch] > max) { max = map[ch]; best = ch; }
  }
  return best;
}`),

  C('coding-longest-prefix', 'Find the Longest Common Prefix',
    'Compare characters column by column across all strings.',
    `function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  for (let i = 0; i < strs[0].length; i++) {
    const ch = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== ch) return strs[0].slice(0, i);
    }
  }
  return strs[0];
}`,
    { output: '["flower","flow","flight"] → "fl"' }),

  C('coding-string-rotation', 'Check if String is Rotation of Another',
    'If s2 is rotation of s1, then s2 is substring of s1 + s1.',
    `function isRotation(s1, s2) {
  if (s1.length !== s2.length) return false;
  return (s1 + s1).includes(s2);
}`,
    { output: '"waterbottle" rotated → "erbottlewat"' }),

  C('coding-word-count', 'Find Number of Words in a String',
    'Trim and split on one or more spaces.',
    `function wordCount(str) {
  return str.trim().split(/\\s+/).filter(Boolean).length;
}`,
    { output: '"My name Sudha" → 3' }),

  C('coding-compress-string', 'Compress String (Run-Length Encoding)',
    'Loop and count consecutive same chars, append char + count when char changes.',
    `function compress(str) {
  if (!str) return '';
  let out = '', count = 1;
  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) count++;
    else { out += str[i - 1] + count; count = 1; }
  }
  return out;
}`,
    { output: '"aabbb" → "a2b3"' }),
];

export const codingArrayProblems = [
  C('coding-two-sum', 'Two Sum',
    'Use Map to store value → index. For each num, check if target - num exists in map.',
    `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    { complexity: 'Time O(n), Space O(n).' }),

  C('coding-remove-dup-array', 'Remove Duplicates from Array',
    'Spread into Set and back to array. Sort if interviewer wants sorted output.',
    `const arr = [4, 4, 5, 5, 6, 6, 2, 2, 3, 1];
const unique = [...new Set(arr)].sort((a, b) => a - b);
// [1, 2, 3, 4, 5, 6]`,
    { output: '[1, 2, 3, 4, 5, 6]' }),

  C('coding-find-duplicates', 'Find Duplicate Elements in Array',
    'Track seen in Set. If already seen, it is duplicate.',
    `function findDuplicates(arr) {
  const seen = new Set(), dups = new Set();
  for (const n of arr) {
    if (seen.has(n)) dups.add(n);
    seen.add(n);
  }
  return [...dups];
}`),

  C('coding-max-min', 'Find Largest and Smallest Element',
    'Single loop tracking min and max. Or Math.max/min with spread for small arrays.',
    `function minMax(arr) {
  let min = arr[0], max = arr[0];
  for (const n of arr) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return { min, max };
}`),

  C('coding-second-largest', 'Find Second Largest Number',
    'Track largest and second largest in one pass.',
    `function secondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (const n of arr) {
    if (n > first) { second = first; first = n; }
    else if (n > second && n < first) second = n;
  }
  return second;
}`),

  C('coding-flatten', 'Flatten Nested Array',
    'Recursive reduce: if item is array, flatten recursively else concat value.',
    `function flatten(arr) {
  return arr.reduce(
    (acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
}`,
    { output: '[1,2,[3,[4]]] → [1,2,3,4]' }),

  C('coding-merge-sorted', 'Merge Two Sorted Arrays',
    'Two pointers — push smaller element, advance that pointer.',
    `function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] < b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i)).concat(b.slice(j));
}`),

  C('coding-move-zeros', 'Move All Zeros to the End',
    'Two pointers: write non-zero at writeIndex, fill rest with 0.',
    `function moveZeros(arr) {
  let w = 0;
  for (let r = 0; r < arr.length; r++) {
    if (arr[r] !== 0) arr[w++] = arr[r];
  }
  while (w < arr.length) arr[w++] = 0;
  return arr;
}`),

  C('coding-rotate-array', 'Rotate Array by K Positions',
    'k = k % length. slice last k elements and concat with first part.',
    `function rotate(arr, k) {
  k %= arr.length;
  return arr.slice(-k).concat(arr.slice(0, -k));
}`),

  C('coding-merge-arrays', 'Merge Two Arrays',
    'Concat with spread or concat method. For sorted merge use two pointers.',
    `const merged = [...arr1, ...arr2];
// Sorted: see mergeSorted()`),
];

export const codingJsProblems = [
  C('coding-valid-parentheses', 'Valid Parentheses',
    'Use stack. Push opening brackets. On closing, pop and check pair matches.',
    `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) stack.push(ch);
    else if (!stack.length || stack.pop() !== map[ch]) return false;
  }
  return stack.length === 0;
}`),

  C('coding-debounce', 'Implement Debounce',
    'Return function that clears previous timer and sets new timeout.',
    `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
    { tips: 'See /labs/debounce for live demo.' }),

  C('coding-throttle', 'Implement Throttle',
    'Use flag — run immediately, ignore calls until cooldown ends.',
    `function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}`),

  C('coding-deep-clone', 'Deep Clone an Object',
    'Use structuredClone for modern browsers. Recursive clone with WeakMap for cycles in interviews.',
    `function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);
  const copy = Array.isArray(obj) ? [] : {};
  seen.set(obj, copy);
  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key], seen);
  }
  return copy;
}`),

  C('coding-promise-all', 'Implement Promise.all',
    'Track results array and count. Reject immediately on first failure.',
    `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          results[i] = val;
          if (++done === promises.length) resolve(results);
        },
        reject
      );
    });
  });
}`,
    { tips: 'See /labs/polyfills' }),

  C('coding-polyfill-map', 'Polyfill for Array.prototype.map',
    'Create new array, loop length, call callback for each index that exists.',
    `Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};`),

  C('coding-polyfill-filter', 'Polyfill for Array.prototype.filter',
    'Push to result when callback returns truthy.',
    `Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};`),

  C('coding-polyfill-reduce', 'Polyfill for Array.prototype.reduce',
    'Single accumulator, loop from start or index 1 if no initial value.',
    `Array.prototype.myReduce = function (callback, initial) {
  let acc = initial;
  let start = 0;
  if (acc === undefined) { acc = this[0]; start = 1; }
  for (let i = start; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};`),

  C('coding-call-apply-bind', 'call / apply / bind Polyfill',
    'Temporarily attach function to context object, invoke, delete. bind returns wrapper.',
    `Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx ?? {};
  const key = Symbol('fn');
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return (...later) => fn.myCall(ctx, ...preset, ...later);
};`,
    { tips: 'See /labs/call-apply-bind' }),

  C('coding-currying', 'Currying — Infinite Sum',
    'Closure accumulates total. Empty call returns sum.',
    `function sum(a) {
  let total = a;
  const fn = (b) => {
    if (b === undefined) return total;
    total += b;
    return fn;
  };
  return fn;
}
// sum(10)(20)(30)() → 60`,
    { output: 'sum(10)(20)(30)() → 60' }),

  C('coding-first-repeating', 'First Repeating Character',
    'Set tracks seen chars. Return first char already in set.',
    `function firstRepeating(str) {
  const seen = new Set();
  for (const ch of str) {
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
  return null;
}`,
    { output: '"success" → "c"' }),

  C('coding-fibonacci', 'Fibonacci Series',
    'Iterative: swap a,b. Or recursive with memo for interview follow-up.',
    `function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`),

  C('coding-factorial', 'Factorial Using Recursion',
    'Base case n <= 1 return 1. Else n * factorial(n-1).',
    `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`),

  C('coding-binary-search', 'Binary Search',
    'Sorted array. Compare mid, go left or right half.',
    `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    { complexity: 'Time O(log n).' }),

  C('coding-memoization', 'Memoization Function',
    'Cache results by serialized arguments.',
    `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}`),

  C('coding-sum-even', 'Sum of All Even Numbers from List',
    'Filter even numbers then reduce to sum.',
    `const sumEven = (list) =>
  list.filter((n) => n % 2 === 0).reduce((a, b) => a + b, 0);`),

  C('coding-settimeout-1-5', 'Print 1–5 with setTimeout (fix var loop)',
    'Use let for block scope per iteration so each timeout captures correct i.',
    `for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 100);
}`,
    { output: '1, 2, 3, 4, 5 (not five 6s)' }),
];

export const ALL_CODING_QUESTIONS = [
  ...codingStringProblems,
  ...codingArrayProblems,
  ...codingJsProblems,
];
