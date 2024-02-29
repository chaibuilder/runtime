import * as React from "react";
import { VideoIcon } from "@radix-ui/react-icons";
import { isEmpty } from "lodash";
import { Checkbox, Model, SingleLineText, Styles } from "../controls";
import { registerChaiBlock } from "../runtime/builder-blocks";
import EmptySlot from "./empty-slot";
import { ChaiBlock } from "../helper/types/ChaiBlock.ts";

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?youtube\.com\/(watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/;
const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/;
const DAILYMOTION_REGEX = /^(https?:\/\/)?(www\.)?dailymotion\.com\/(video|embed\/video)\/([a-zA-Z0-9_-]+)/;

const getEmbedURL = (url: string): string | null => {
  if (YOUTUBE_REGEX.test(url)) {
    const match = url.match(YOUTUBE_REGEX);
    if (match) {
      const videoId = match[4];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  if (VIMEO_REGEX.test(url)) {
    const match = url.match(VIMEO_REGEX);
    if (match) {
      const videoId = match[3];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  if (DAILYMOTION_REGEX.test(url)) {
    const match = url.match(DAILYMOTION_REGEX);
    if (match) {
      const videoId = match[4];
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    }
    return url;
  }

  return null;
};

const VideoBlock = (
  block: ChaiBlock & {
    _controls: Record<string, any>;
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, styles, _url, _controls } = block;

  const autoplay = _controls.autoPlay;
  const controls = _controls.controls;
  const muted = autoplay || _controls.muted;
  const loop = _controls.loop;

  if (isEmpty(_url)) return <EmptySlot blockProps={blockProps} text="VIDEO URL" className="h-36" />;

  let embedURL = getEmbedURL(_url);
  let videoElement = null;
  if (embedURL) {
    if (!isEmpty(embedURL)) {
      const iframeControls = [];
      iframeControls.push(`autoplay=${autoplay ? 1 : 0}`);
      iframeControls.push(`controls=${controls ? 1 : 0}`);
      iframeControls.push(`mute=${muted ? 1 : 0}&muted=${muted ? 1 : 0}`);
      iframeControls.push(`loop=${loop ? 1 : 0}`);
      embedURL = `${embedURL}?${iframeControls.join("&")}`;
    }
    videoElement = React.createElement("iframe", {
      ...blockProps,
      ...styles,
      src: embedURL,
      allow: "autoplay *; fullscreen *",
      allowFullScreen: true,
      frameBorder: 0,
    });
  } else {
    videoElement = React.createElement("video", {
      ...blockProps,
      ...styles,
      src: _url,
      controls,
      muted,
      autoPlay: autoplay,
      loop,
    });
  }

  return (
    <div className="relative overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      <div className="absolute h-full w-full" />
      {videoElement}
    </div>
  );
};

registerChaiBlock(VideoBlock as React.FC<any>, {
  type: "Video",
  label: "Video",
  category: "core",
  icon: VideoIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "absolute top-0 left-0 w-full h-full" }),
    _url: SingleLineText({
      title: "Video URL",
      default: "https://www.youtube.com/watch?v=9xwazD5SyVg&ab_channel=MaximilianMustermann",
    }),
    _controls: Model({
      title: "Controls",
      properties: {
        autoPlay: Checkbox({ title: "Autoplay", default: true }),
        controls: Checkbox({ title: "Show widgets", default: false }),
        loop: Checkbox({ title: "Loop", default: false }),
        muted: Checkbox({ title: "Muted", default: true }),
      },
    }),
  },
});

export default VideoBlock;
