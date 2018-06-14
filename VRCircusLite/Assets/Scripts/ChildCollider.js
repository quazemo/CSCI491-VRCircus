#pragma strict

public interface ChildCollider
{
	function contact(col : Collision, childObj : GameObject);
}
