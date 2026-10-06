import { AvatarState } from "../types";
import { resolveAvatarColors } from "../../utils/avatar-resolver";
import { AvatarFilters } from "./filters";
import { AvatarLayers, AvatarOverlays } from "./layers";
import { AVATAR_FILTER_PREFIX } from "./filters";
import { AVATAR_FRAME, AVATAR_VIEWBOX } from "../anatomy";

export const renderAvatarSvg = async (state: AvatarState): Promise<string> => {
  const { hairColor, skinTone } = resolveAvatarColors(state);

  const filterId = `${AVATAR_FILTER_PREFIX}-${state.texture}`;

  const svgContent = (
    <svg
      viewBox={AVATAR_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100"
      height="100"
      style={{
        // @ts-expect-error CSS custom properties
        "--avatar-hair": hairColor,
        "--avatar-skin": skinTone,
      }}
    >
      <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />
      <g>
        <rect
          x={AVATAR_FRAME.x}
          y={AVATAR_FRAME.y}
          width={AVATAR_FRAME.size}
          height={AVATAR_FRAME.size}
          fill="#1a1a1a"
          opacity="0.03"
        />
        <g filter={state.texture !== "none" ? `url(#${filterId}-${state.texture})` : undefined}>
          <AvatarLayers state={state} filterId={filterId} />
        </g>
        <AvatarOverlays state={state} filterId={filterId} />
      </g>
    </svg>
  );

  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(svgContent);
};
