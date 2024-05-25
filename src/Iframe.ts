export const IframeInitialContent: string = `<!doctype html>
<html class="scroll-smooth h-full overflow-y-auto">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://old.chaibuilder.com/offline/tailwind.cdn.js"></script>
    <style>
    html { height: 100%; overflow:auto; }
    body { height: 100%; }
    .air-highlight{ outline: 1px solid #42a1fc !important; outline-offset: -1px;}
    .air-highlight-multi{ outline: 1px solid #29e503 !important; outline-offset: -1px;}
    body{   -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none;
            -moz-user-select: none;-ms-user-select: none; user-select: none; }
    html{
      -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    /** IMPORTANT: Make fields content editable in SAFARI */
    [contenteditable] {-webkit-user-select: text;user-select: text;}

    html::-webkit-scrollbar { width: 0 !important }
    .aspect-auto{aspect-ratio: auto;}
    .aspect-square{aspect-ratio: 1/1;}
    .aspect-video{aspect-ratio: 16/9;}
    .dragging [data-dnd="leaf"] { pointer-events: none; } .dragging [data-dnd="leaf"] * { pointer-events: none; }
    .dragging [data-dnd="ignore"], .dragging [data-dnd="ignore"] * { pointer-events: none; }
    a{ pointer-events: none !important; }
    [contenteditable="true"], [contenteditable="true"] * { cursor: text !important; }
    [contenteditable="true"] {
        outline: none;
        box-shadow: 0 0 0px 4px rgba(36, 150, 255, 0.2);
        -webkit-user-select: text;
        -moz-user-select: text;
        user-select: text;
    }
    </style>    
    <style id="hidden-blocks"></style>
    <style id="selected-block"></style>
    <style id="selected-styling-block"></style>
    <style id="highlighted-block"></style>
    <style id="dragged-block"></style>

  </head>
  <body class="font-body antialiased h-full">
    <div class="frame-root"></div>
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.js"></script>
  </body>
</html>`;
