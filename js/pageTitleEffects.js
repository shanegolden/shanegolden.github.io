<script>
  const defaultTitle = "Shane Golden";
  const initialAwayTitle = "Wait, come back!";
  const awayBaseTitle = "The future is waiting";
  const awayEmojis = ["😐", "🫤", "😐", "🫠"];
  const welcomeBackEmoji = "🐐";
  const createWithShaneEmojis = ["☄️","😇","🫶","😏","🔋","⭐️","🤯","🤸","🤩","⭐️","✨","💫","🌠","🦸🏻‍♂️","🚀","🛸","🛫","🤖","👨🏻‍💻","👨‍🔬","⚡️"];
  
  let awayInterval = null;
  let dotCount = 0;
  const maxDots = 3;
  
  // Track first visit
  let firstVisit = sessionStorage.getItem("firstVisit") !== "true";
  sessionStorage.setItem("firstVisit", "true");
  
  // Helper: returns dots + fixed padding for emoji alignment
  function getFixedDots(count) {
      const dots = ".".repeat(count);
      const totalPadding = maxDots + 1 - count; // ensures emoji always same position
      return dots + "\u00A0".repeat(totalPadding);
  }
  
  // Away animation: "Wait, come back!" then "The future is waiting" loop
  function startAwayAnimation() {
      clearInterval(awayInterval);
      document.title = initialAwayTitle;
  
      setTimeout(() => {
          dotCount = 0;
          let emojiIndex = 0;
  
          awayInterval = setInterval(() => {
              dotCount = (dotCount + 1) % (maxDots + 1);
              emojiIndex = (emojiIndex + 1) % awayEmojis.length;
              document.title = awayBaseTitle + getFixedDots(dotCount) + awayEmojis[emojiIndex];
          }, 400);
      }, 1000);
  }
  
  // Welcome back sequence
  function showWelcomeBackSequence() {
      clearInterval(awayInterval);
  
      const fixedPadding = "\u00A0".repeat(maxDots + 1);
      const randomCreateEmoji = createWithShaneEmojis[Math.floor(Math.random() * createWithShaneEmojis.length)];
  
      // Step 1: Welcome back!
      document.title = `Welcome back!${fixedPadding}${welcomeBackEmoji}`;
  
      // Step 2: Create with Shane
      setTimeout(() => {
          document.title = `Create with Shane${fixedPadding}${randomCreateEmoji}`;
      }, 2000);
  
      // Step 3: Return to default title
      setTimeout(() => {
          document.title = defaultTitle;
      }, 5000);
  }
  
  // Visibility change handler
  document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
          // Only start away animation if NOT first visit
          if (!firstVisit) {
              startAwayAnimation();
          }
      } else {
          // Only show welcome back sequence if NOT first visit
          if (!firstVisit) {
              showWelcomeBackSequence();
          } else {
              document.title = defaultTitle;
              firstVisit = false; // mark that user has now returned at least once
          }
      }
  });
  
  // Initialize
  document.title = defaultTitle;
</script>
