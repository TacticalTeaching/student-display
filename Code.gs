const FILE_FALLBACKS = {
  'home': ['home', 'Home', 'Student Home'],
  'number': ['number', 'Number'],
  'expanding-numbers': ['expanding-numbers', 'expanded-numbers', 'index'],
  'operations': ['operations', 'Operations'],
  'addition': ['addition', 'Addition Workout'],
  'subtraction': ['subtraction', 'Subtraction Workout'],
  'multiplication': ['multiplication', 'Multiplication Workout'],
  'division': ['division', 'Division Workout'],
  'protractor': ['protractor', 'Protractor'],
  'complementary-angles': ['complementary-angles', 'Complementary Angles'],
  'supplementary-angles': ['supplementary-angles', 'Supplementary Angles']
};

function resolveHtmlOutput(pageKey) {
  var candidates = FILE_FALLBACKS[pageKey] || [pageKey];
  for (var i = 0; i < candidates.length; i++) {
    try {
      return HtmlService.createHtmlOutputFromFile(candidates[i]);
    } catch (err) {
      // Try next candidate name
    }
  }
  return null;
}

function doGet(e) {
  var requested = (e && e.parameter && e.parameter.page) ? e.parameter.page : 'home';
  var tryOrder = [requested, 'home', 'number', 'expanding-numbers', 'index'];

  for (var i = 0; i < tryOrder.length; i++) {
    var out = resolveHtmlOutput(tryOrder[i]);
    if (out) {
      return out
        .setTitle('Maths Home')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
  }

  return HtmlService.createHtmlOutput(
    '<h3>No HTML files found. Please create <code>home.html</code>, <code>number.html</code>, and <code>expanding-numbers.html</code> in your Apps Script project.</h3>'
  );
}

function loadPage(pageKey) {
  var out = resolveHtmlOutput(pageKey);
  if (!out) {
    throw new Error('Page not found: ' + pageKey);
  }
  return out.getContent();
}
