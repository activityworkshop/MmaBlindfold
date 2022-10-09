# MmaBlindfold
A Firefox extension which obscures fight results from Wikipedia pages about MMA.

Wikipedia pages cover many MMA events in great detail, including the winners and losers, win method,
and the Round number and time of stoppage.  This is excellent information, of course, but if one doesn't
want to know the result, it's difficult to see who took part in past events.  In this case it could be
useful to have a "blindfold" which lets you see the event details and participants, without revealing
the winners and losers.

This extension covers that case - when activated, it removes some of the information (like win method and time)
from the results tables inside the Wikipedia page.  The participants in each bout are randomly swapped
so you can see who competed against whom in which weight class and on which card, but not who won.

In addition, the "Fight of the Night" bonus award (if there is one) is listed but with the competitors
again randomly swapped.  Any "Performance of the Night" bonus information is deleted.

This extension is based heavily on the examples at example from Mozilla at https://github.com/mdn/webextensions-examples,
especially `apply-css` and `cookie-bg-picker`.

The icon is provided by FontAwesome.com on CC-by-4.0 terms: https://fontawesome.com/license/free
