using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Catapult: Resetable
{
	protected bool turn;
	bool released = true;
	public GameObject balloonSpawn;
	public GameObject balloonPrefab;
	public Transform leftHook;
	public Transform rightHook;
	protected GameObject localBalloon;
	public LineRenderer leftLine;
	public LineRenderer rightLine;
	public Rigidbody rB;
	protected const float spring = 18.0f;
	public Catapult otherCatapult;

	public virtual void CommenceTurn()
	{
		rB.velocity = Vector3.zero;
		balloonSpawn.transform.localPosition = new Vector3(0.0f,0.0f,3.0f);
		localBalloon = (GameObject)Instantiate(balloonPrefab, balloonSpawn.transform.position, Quaternion.identity);
		localBalloon.GetComponent<Waterballoon>().SetCatapult(this);
		turn = true;
	}
	public GameObject GetLocalBalloon()
	{
		return localBalloon;
	}
	public bool GetTurn()
	{
		return turn;
	}
	public void CommencePull()
	{
		released = false;
		rB.constraints = RigidbodyConstraints.FreezeAll;
	}
	public override void Reset()
	{
		released = true;
		turn = false;
		rB.velocity = Vector3.zero;
		balloonSpawn.transform.localPosition = new Vector3(0.0f,0.0f,3.0f);
	}
	protected virtual void Aim()
	{

	}
	public void Release()
	{
		if (!released && rB != null)
		{
			rB.constraints = RigidbodyConstraints.None;
			released = true;
			if (localBalloon != null)
			{
				localBalloon.GetComponent<Waterballoon>().Detach();
			}
		}
	}

	void FixedUpdate()
	{
		Vector3 pos = balloonSpawn.transform.position;
		float leftDist = Vector3.Distance(leftHook.position, pos);
		float rightDist = Vector3.Distance(rightHook.position, pos);
		if (released)
		{
			Vector3 leftForce = leftHook.position - pos;
			leftForce *= leftDist * spring;
			Vector3 rightForce = rightHook.position - pos;
			rightForce *= rightDist * spring;
			rB.AddForce(leftForce, ForceMode.Force);
			rB.AddForce(rightForce, ForceMode.Force);
		}
		else if (!released && localBalloon != null)
		{
			Aim();
		}
		if (localBalloon != null && localBalloon.GetComponent<Waterballoon>().attached)
		{
			localBalloon.transform.position = balloonSpawn.transform.position; 
		}


		Vector3[] leftPos = new Vector3[]{leftHook.position, pos};
		Vector3[] rightPos = new Vector3[]{rightHook.position, pos};


		leftLine.SetPositions(leftPos);
		rightLine.SetPositions(rightPos);
		float leftWidth = 0.2f * (3.5f/leftDist);
		float rightWidth = 0.2f * (3.5f/rightDist);
		leftLine.SetWidth(leftWidth, leftWidth);
		rightLine.SetWidth(rightWidth, rightWidth);
	}
	public void GetForce(Vector3 pos, Rigidbody r)
	{
		float leftDist = Vector3.Distance(leftHook.position, pos);
		float rightDist = Vector3.Distance(rightHook.position, pos);
		Vector3 leftForce = leftHook.position - pos;
		leftForce *= leftDist * spring;
		Vector3 rightForce = rightHook.position - pos;
		rightForce *= rightDist * spring;
		r.AddForce(leftForce, ForceMode.Force);
		r.AddForce(rightForce, ForceMode.Force);		
	}
	public void NextTurn()
	{
		if (otherCatapult == null)
		{
			CommenceTurn();
		}
		else
		{
			otherCatapult.CommenceTurn();
		}
	}
}
