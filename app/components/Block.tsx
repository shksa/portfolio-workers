import { Fragment } from "react";
import { Text } from "./Text";

export const Block = ({ block }: { block: BlockObjectResponse }) => {
	const { type, id } = block;

	let blockContent;

	switch (type) {
		case "paragraph":
			blockContent = (
				<p>
					<Text text={block[type].text} />
				</p>
			);
			break;
		case "heading_1":
			blockContent = (
				<h1>
					<Text text={block[type].text} />
				</h1>
			);
			break;
		case "heading_2":
			blockContent = (
				<h2>
					<Text text={block[type].text} />
				</h2>
			);
			break;
		case "heading_3":
			blockContent = (
				<h3>
					<Text text={block[type].text} />
				</h3>
			);
			break;
		case "bulleted_list_item":
		case "numbered_list_item":
			blockContent = (
				<li>
					<Text
						text={
							"numbered_list_item" in block
								? block.numbered_list_item.text
								: block.bulleted_list_item.text
						}
					/>
				</li>
			);
			break;
		case "to_do":
			blockContent = (
				<div>
					<label htmlFor={id}>
						<input
							type="checkbox"
							id={id}
							defaultChecked={block[type].checked}
						/>{" "}
						<Text text={block[type].text} />
					</label>
				</div>
			);
			break;
		case "toggle":
			blockContent = (
				<details>
					<summary>
						<Text text={block[type].text} />
					</summary>
					{/* @ts-ignore */}
					{block[type].children?.map((block) => (
						<Fragment key={block.id}>
							<Block block={block} />
						</Fragment>
					))}
				</details>
			);
			break;
		case "child_page":
			blockContent = <p>{block[type].title}</p>;
			break;
		case "image":
			const src =
				block.image.type === "external"
					? block.image.external.url
					: block.image.file.url;
			const caption = block[type].caption[0]?.plain_text
			blockContent = (
				<figure>
					<img src={src} alt={caption} />
					{caption && <figcaption>{caption}</figcaption>}
				</figure>
			);
			break;
		case "code":
			blockContent = (
				<pre>
					<code><Text text={block[type].text} /></code>
				</pre>
			)
			break;
		default:
			blockContent = (
				<span>
					`❌ Unsupported block ($
					{type === "unsupported" ? "unsupported by Notion API" : type})`
				</span>
			);
			break;
	}

	return (
		<div data-block-id={id}>
			{blockContent}
			{/* @ts-ignore */}
			{block[type].children?.map((childBlock) => (
				<Block key={childBlock.id} block={childBlock} />
			))}
		</div>
	);
};
