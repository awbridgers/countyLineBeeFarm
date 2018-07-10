import React, { Component } from 'react';
import './App.css';
import NavMenu from "./navBar.jsx"
import loss from './images/loss.png'




export default class CCD extends Component {
  render(){
    return(
      <div className = "App">
        <NavMenu />
        <div className = 'wordContainer'>
          <h1>What's Happening to the Bees?</h1>

          <p>In 2006, some beekeepers began to see an enormous increase in the number of lost hives over the year. In some places, beekeepers
          lost up to 90% of their hives for seemingly no reason. What was most puzzling was that the entire worker bee population
          was abandoning seemingly healthy hives, leaving the queen and brood behind. Without the worker bees, the hive would evenetually die.
          This phenomenon became known as <b>Colony Collapse Disorder.</b></p>

        <p>Since then, scientists have been closely stuyding the honey bee population and their hives.
          One <a href = 'http://www.pnas.org/content/113/1/140' target = '_blank' rel="noopener noreferrer">study</a> found that
          "Between 2008 and 2013, modeled bee abundance declined across 23% of US land area." According to
          <a href = 'www.beeinfomred.org' target = "_blank" rel="noopener noreferrer"> BeeInformed.Org</a>, the percent of bee colonies lost is slightly down from previous years, but remains at levels
          that causes a large concern for beekeepers nationwide.</p> <p><img className = 'graph' src = {loss} alt = 'beeGraph'></img></p>
        <p>What the exact cause of CCD is still largely unknown. According to the EPA, researches beleive it is mainly caused by a combination of the vorroa mite, diseases, pesticide poisoning,
          change in habitat due to urbanization, and inadequate forage or nutrition.</p>
        <p><h1>Why it Matters</h1></p>
        <p>The honey bee is the single best pollinator of crops in the world. According to the <a href = "https://obamawhitehouse.archives.gov/the-press-office/2014/06/20/fact-sheet-economic-challenge-posed-declining-pollinator-populations" target = '_blank' rel="noopener noreferrer">
        US Government</a>, the honey bee
        is responsible for the pollination of at least 90 commercially grown crops in North America and 35% of global food production worldwide.
        Because of its importance in agriculture, the honey bee is said to account for more than $15 billion annually in the United States economy.
        Needless to say, the honey bee has a critical impact on agricultre and food production across the globe. This is why it is so important that we
        find a way to not only slow the rate of bee hives being lost, but increase the number of bees in the population. It is this goal that caused us
        to start County Line Bee Farm.
      </p>
      <p><h1>What you can do to help</h1></p>
        <p>There are many ways you can help the bees. One way is to become a backyard beekeeper yourself. This adds healthy bees to the local population
        and will leave you with plenty of honey for your effort. If beekeeping isn't for you, simply keeping a garden and staying away from pesticides
        that are harmful to honey bees can also have an important role in bringing back nature's pollinator. You may also choose to donate to groups dedicated to protecting the honey bee
        or sponsor a hive with organizations like the <a href = 'https://thehoneybeeconservancy.org/2017/06/22/honey-bees-heroes-planet/' target = '_blank' rel="noopener noreferrer">Honeybee Conservancy.</a></p>
      <p><a href = 'http://www.newyorkbeesanctuary.org/blog/2016/3/3/10-ways-you-can-help-save-the-bees' target ='_blank' rel="noopener noreferrer">Check Here</a> for more information on what you can do to help save the honey bee!</p>


          </div>
        </div>
      )
    }
  }
