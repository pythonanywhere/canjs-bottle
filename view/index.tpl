<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="/css/toast.css" />
    <link rel="stylesheet" href="/css/custom.css" />
  </head>
  <body>
    <div id="out"></div>
    <script id="app" type="text/stache">
      <div class="grid">
        <div class="grid__col grid__col--1-of-4 grid__col--centered">
          <form>
            <input type="text" name="tag" placeholder="Look by tags" />
          </form>
        </div>
        <div class="grid__col grid__col--1-of-4 grid__col--centered margin-top-16px">
          <form>
            <input type="text" name="title" placeholder="A task here" />
            <input type="submit" value="Add" />
          </form>
        </div>
        <div class="grid__col grid__col--1-of-3 grid__col--centered margin-top-8px">
          Run this shit<a href="#" class="button">Details</a><a href="#" class="button">Done</a>
        </div>
        <div class="grid__col grid__col--1-of-3 grid__col--centered margin-top-8px">
          Get out<a href="#" class="button">Details</a><a href="#" class="button">Done</a>
        </div>
        <div class="grid__col grid__col--1-of-3 grid__col--centered margin-top-8px">
          Eat<a href="#" class="button">Details</a><a href="#" class="button">Done</a>
        </div>
      </div>
    </script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.1.4/zepto.min.js"></script>
    <script type="text/javascript" src="//canjs.com/release/2.1.3/can.zepto.js"></script>
    <script type="text/javascript" src="//canjs.com/release/2.1.3/can.stache.js"></script>
    <script type="text/javascript" src="javascript/app.js"></script>
  </body>
</html>