import React, { useState, useEffect } from 'react';
import '../css/Grid.css'
import { setupBoard } from '../setup';
// import { setState } from 'expect/build/jestMatchersObject';

const Grid = () => {
  const [hexes, setHexes] = useState([]);
  const [vertexes, setVertexes] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    setupBoard(hexes, vertexes, paths, document);
  }, [])

  return (
    <div id="gridComponent">
      <div id="hexOverlay">
        <div id="topHexRow" className="hexRow">
          <div id="hex0" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex1" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex2" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
        </div>
        <div id="upperHexRow" className="hexRow">
          <div id="hex3" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex4" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex5" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex6" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
        </div>
        <div id="middle" className="hexRow">
          <div id="hex7" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex8" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex9" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex10" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex11" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
        </div>
        <div id="lowerHexRow" className="hexRow">
          <div id="hex12" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex13" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex14" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex15" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
        </div>
        <div id="bottomHexRow" className="hexRow">
          <div id="hex16" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex17" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
          <div id="hex18" className="hexagon">
            <div className="hexTop"></div>
            <div className="hexBottom"></div>
          </div>
        </div>
      </div>
      <div id="pathOverlay">
        <div id="topPathRow" className="pathRow">
          <div id="path0" className="path tiltUp"></div>
          <div id="path1" className="path tiltDown"></div>
          <div id="path2" className="path tiltUp"></div>
          <div id="path3" className="path tiltDown"></div>
          <div id="path4" className="path tiltUp"></div>
          <div id="path5" className="path tiltDown"></div>
        </div>
        <div id="topVertRow" className="pathRow vertRow">
          <div id="path6" className="path vertical"></div>
          <div id="path7" className="path vertical"></div>
          <div id="path8" className="path vertical"></div>
          <div id="path9" className="path vertical"></div>
        </div>
        <div id="upperTiltRow" className="pathRow tiltRow">
          <div id="path10" className="path tiltUp"></div>
          <div id="path11" className="path tiltDown"></div>
          <div id="path12" className="path tiltUp"></div>
          <div id="path13" className="path tiltDown"></div>
          <div id="path14" className="path tiltUp"></div>
          <div id="path15" className="path tiltDown"></div>
          <div id="path16" className="path tiltUp"></div>
          <div id="path17" className="path tiltDown"></div>
        </div>
        <div id="upperVertRow" className="pathRow vertRow">
          <div id="path18" className="path vertical"></div>
          <div id="path19" className="path vertical"></div>
          <div id="path20" className="path vertical"></div>
          <div id="path21" className="path vertical"></div>
          <div id="path22" className="path vertical"></div>
        </div>
        <div id="upperMiddleTiltRow" className="pathRow tiltRow">
          <div id="path23" className="path tiltUp"></div>
          <div id="path24" className="path tiltDown"></div>
          <div id="path25" className="path tiltUp"></div>
          <div id="path26" className="path tiltDown"></div>
          <div id="path27" className="path tiltUp"></div>
          <div id="path28" className="path tiltDown"></div>
          <div id="path29" className="path tiltUp"></div>
          <div id="path30" className="path tiltDown"></div>
          <div id="path31" className="path tiltUp"></div>
          <div id="path32" className="path tiltDown"></div>
        </div>
        <div id="middleVertRow" className="pathRow vertRow">
          <div id="path33" className="path vertical"></div>
          <div id="path34" className="path vertical"></div>
          <div id="path35" className="path vertical"></div>
          <div id="path36" className="path vertical"></div>
          <div id="path37" className="path vertical"></div>
          <div id="path38" className="path vertical"></div>
        </div>
        <div id="lowerMiddleTiltRow" className="pathRow tiltRow">
          <div id="path39" className="path tiltDown"></div>
          <div id="path40" className="path tiltUp"></div>
          <div id="path41" className="path tiltDown"></div>
          <div id="path42" className="path tiltUp"></div>
          <div id="path43" className="path tiltDown"></div>
          <div id="path44" className="path tiltUp"></div>
          <div id="path45" className="path tiltDown"></div>
          <div id="path46" className="path tiltUp"></div>
          <div id="path47" className="path tiltDown"></div>
          <div id="path48" className="path tiltUp"></div>
        </div>
        <div id="lowerVertRow" className="pathRow vertRow">
          <div id="path49" className="path vertical"></div>
          <div id="path50" className="path vertical"></div>
          <div id="path51" className="path vertical"></div>
          <div id="path52" className="path vertical"></div>
          <div id="path53" className="path vertical"></div>
        </div>
        <div id="lowerTiltRow" className="pathRow tiltRow">
          <div id="path54" className="path tiltDown"></div>
          <div id="path55" className="path tiltUp"></div>
          <div id="path56" className="path tiltDown"></div>
          <div id="path57" className="path tiltUp"></div>
          <div id="path58" className="path tiltDown"></div>
          <div id="path59" className="path tiltUp"></div>
          <div id="path60" className="path tiltDown"></div>
          <div id="path61" className="path tiltUp"></div>
        </div>
        <div id="bottomVertRow" className="pathRow vertRow">
          <div id="path62" className="path vertical"></div>
          <div id="path63" className="path vertical"></div>
          <div id="path64" className="path vertical"></div>
          <div id="path65" className="path vertical"></div>
        </div>
        <div id="bottomPathRow" className="pathRow">
          <div id="path66" className="path tiltDown"></div>
          <div id="path67" className="path tiltUp"></div>
          <div id="path68" className="path tiltDown"></div>
          <div id="path69" className="path tiltUp"></div>
          <div id="path70" className="path tiltDown"></div>
          <div id="path71" className="path tiltUp"></div>
        </div>
      </div>
      <div id="vertexOverlay">
        <div id="topVertexRow" className="vertexRow">
          <div id="vertex0" className="vertex"></div>
          <div id="vertex1" className="vertex"></div>
          <div id="vertex2" className="vertex"></div>
          <div id="vertex3" className="vertex"></div>
          <div id="vertex4" className="vertex"></div>
          <div id="vertex5" className="vertex"></div>
          <div id="vertex6" className="vertex"></div>
        </div>
        <div id="upperVertexRow" className="vertexRow">
          <div id="vertex7" className="vertex"></div>
          <div id="vertex8" className="vertex"></div>
          <div id="vertex9" className="vertex"></div>
          <div id="vertex10" className="vertex"></div>
          <div id="vertex11" className="vertex"></div>
          <div id="vertex12" className="vertex"></div>
          <div id="vertex13" className="vertex"></div>
          <div id="vertex14" className="vertex"></div>
          <div id="vertex15" className="vertex"></div>
        </div>
        <div id="upperMiddleVertexRow" className="vertexRow">
          <div id="vertex16" className="vertex"></div>
          <div id="vertex17" className="vertex"></div>
          <div id="vertex18" className="vertex"></div>
          <div id="vertex19" className="vertex"></div>
          <div id="vertex20" className="vertex"></div>
          <div id="vertex21" className="vertex"></div>
          <div id="vertex22" className="vertex"></div>
          <div id="vertex23" className="vertex"></div>
          <div id="vertex24" className="vertex"></div>
          <div id="vertex25" className="vertex"></div>
          <div id="vertex26" className="vertex"></div>
        </div>
        <div id="lowerMiddleVertexRow" className="vertexRow">
          <div id="vertex27" className="vertex"></div>
          <div id="vertex28" className="vertex"></div>
          <div id="vertex29" className="vertex"></div>
          <div id="vertex30" className="vertex"></div>
          <div id="vertex31" className="vertex"></div>
          <div id="vertex32" className="vertex"></div>
          <div id="vertex33" className="vertex"></div>
          <div id="vertex34" className="vertex"></div>
          <div id="vertex35" className="vertex"></div>
          <div id="vertex36" className="vertex"></div>
          <div id="vertex37" className="vertex"></div>
        </div>
        <div id="lowerVertexRow" className="vertexRow">
          <div id="vertex38" className="vertex"></div>
          <div id="vertex39" className="vertex"></div>
          <div id="vertex40" className="vertex"></div>
          <div id="vertex41" className="vertex"></div>
          <div id="vertex42" className="vertex"></div>
          <div id="vertex43" className="vertex"></div>
          <div id="vertex44" className="vertex"></div>
          <div id="vertex45" className="vertex"></div>
          <div id="vertex46" className="vertex"></div>
        </div>
        <div id="bottomVertexRow" className="vertexRow">
          <div id="vertex47" className="vertex"></div>
          <div id="vertex48" className="vertex"></div>
          <div id="vertex49" className="vertex"></div>
          <div id="vertex50" className="vertex"></div>
          <div id="vertex51" className="vertex"></div>
          <div id="vertex52" className="vertex"></div>
          <div id="vertex53" className="vertex"></div>
        </div>
      </div>
      <div id="numberOverlay">
        <div id="topNumberRow" className="numberRow">
          <div className="hexNumber">fuck</div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
        </div>
        <div id="upperNumberRow" className="numberRow">
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
        </div>
        <div id="middleNumberRow" className="numberRow">
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
        </div>
        <div id="lowerNumberRow" className="numberRow">
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
        </div>
        <div id="bottomNumberRow" className="numberRow">
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
          <div className="hexNumber"></div>
        </div>
      </div>
    </div>
  )
}

export { Grid as default }