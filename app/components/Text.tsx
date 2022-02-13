import classNames from "classnames";
import { Fragment } from "react";
import { Link } from "remix";

export const Text = ({ text }: { text: RichTextItemResponse[] }) => {
	const textElements = text.map((richTextObj, id) => {
		const {
			annotations: { bold, code, color, italic, strikethrough, underline },
			type,
			plain_text,
		} = richTextObj;

		switch (type) {
			case "text":
				const { text } = richTextObj;
				return (
					<span
						key={id}
						className={classNames({
							"font-bold": bold,
							"font-mono bg-gray-100 px-1 py-[0.125rem] rounded-sm text-red-500": code,
							italic: italic,
							"line-through": strikethrough,
							underline: underline,
						})}
						style={{ color: color !== "default" ? color : undefined }}
					>
						{text.link ? (
							<Link to={text.link.url}>{text.content}</Link>
						) : (
							text.content
						)}
					</span>
				);

			default:
				return <span>{plain_text}</span>;
		}
	});
	return <Fragment>{textElements}</Fragment>;
};
