<template>
  <div class="about">
    <h1 id="about-title">Why Can't I Firmus?</h1>
    <div id="about-content">
      <div class="about-segment">
        <p>
          This is a web application built to generate and evaluate cantus firmi. If you are tired of doing your music theory homework, then this app may be for you. 
        </p>   
        <p>
          Functionality is split into two parts - the <strong>Generator</strong> and the <strong>Evaluator</strong>.
        </p>
      </div>
      <h2 class="about-subtitle">Generator</h2>
      <div class="about-segment">
        <p>
          The generator takes in a few parameters and then procedurally generates a valid cantus firmus that fits those parameters. 
        </p>
        <p> 
          All you need to do is select the <strong>mode</strong> and number of <strong>measures</strong>, then click the <strong>generate</strong> button and,<em> voila!</em> Your homework is done for you.
        </p>
        <p>
          The <strong>play</strong> button may be used in order to play back a cantus firmus that has been generated.
        </p>
      </div>
      <h2 class="about-subtitle">Evaluator</h2>
      <div class="about-segment">
        <p>
          The evaluator is better suited for practice and learning. It will take in a user-created cantus firmus and parse it for any mistakes. 
        </p>
        <p> 
          Again, the <strong>mode</strong> and <strong>measure</strong> number may be selected at the top of the page. The <strong>clear</strong> button empties out all current note values, the <strong>reset</strong> button changes them back to the example values, and the <strong>randomize</strong> button... randomizes them.
        </p>
        <p>
          The <strong>note inputs</strong> are below these buttons, and each is accompanied by a number that corresponds to that note's measure.
        </p>
        <p>
          The <strong>preview</strong> button will show your what your notes look like as musical notation. Finally, the <strong>evaluate</strong> button will actually run the cantus firmus through the program and output any errors or suggestions it finds.
        </p>
        <p>
          Errors will appear in <strong id="strong-error">red</strong> text, while suggestions will appear in <strong id="strong-suggestion">orange</strong>.
        </p>
      </div>
      <h2 class="about-subtitle">What is a cantus firmus, anyway?</h2>
      <div class="about-segment">
        <p>
          Oh. I probably should have led with that. 
        </p>
        <p> 
          A <strong>cantus firmus</strong> is a preexisting melody used as the basis for polyphonic composition. "Cantus firmus" translates from Latin as "fixed melody" - i.e., a song that does not change, regardless of the other melodies around it.
        </p>
        <p>
          The idea, at least in species counterpoint, is that you contruct a single, simple melody using a strict set of music theory principles - that is your cantus firmus - and then build more complicated, complementary melodies on top of it.
        </p>
        <p>
          <strong>Species counterpoint</strong> is a pedagogical tool meant to teach that process. A student takes a cantus firmus and elaborates upon it through several "species" of increasing complexity, gradually gaining more compositional freedom as they go, while still being bound to a specific set of rules.
        </p>
        <p>
          If you'd like to know more, follow the link to Dr. Lindsay Davidson's site below. Her cantus firmus rules differ slightly from the ones I have used in this application, but the general idea is the same.
        </p>
        <div id="a-lindsay">
          <a href="http://www.lindsaydavidson.co.uk/counterpoint/speciescantus.html">Learn more! </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.about {
  margin: 0 auto;
  margin-top: 3em;
  max-width: 50em;
  line-height: 1.5;
  padding: 4em 1em;
  color: #393b50;
}

#about-title {
  font-weight: bold;
  font-size: 4.5em;
  color: #272838;
}

.about-subtitle {
  font-weight: bold;
  margin-top: 1em;
  padding-top: 1em;
  color: #272838;
}

#about-content {
  font-size: 1.3em;
}

.about-segment {
  margin-top: 1.3em;
}

strong {
  color: #14151d;
  font-weight: 700;
}

#strong-error {
  color: rgb(243, 18, 52);
}

#strong-suggestion {
  color: #fc9e4f;
}

#a-lindsay {
  text-align: center;
  padding: 8px;
}

</style>