import Tag, { TagProps } from "../tag";
import s from "./TagList.module.css";

interface TagListProps {
  tags: TagProps[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <ul className={s.tagList}>
      {tags.map((tag, index) => (
        <li>
          <Tag key={`${tag.name}_${index}`} name={tag.name} color={tag.color} />
        </li>
      ))}
    </ul>
  );
}
