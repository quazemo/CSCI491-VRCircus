using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Basket : MonoBehaviour {

	public GameObject ball;
	public GameObject cam;
	public GameObject leftPivot;
	public GameObject rightPivot;
	private Vector3 leftParentPos;
	private Vector3 rightParentPos;
	private Rigidbody rB;
	private float startDist;
	private float K;
	private bool clicked;
	private Vector3 prevMousePos;
	LineRenderer leftLine;
	LineRenderer rightLine;
	private bool leftSnapped;
	private bool rightSnapped;
	private float maxStretch;
	private float zStretch;
	void Start()
	{
		leftLine = leftPivot.GetComponent<LineRenderer>();
		rightLine = rightPivot.GetComponent<LineRenderer>();
		leftParentPos = transform.parent.gameObject.GetComponent<Catapult>().leftPivot.transform.position;
		rightParentPos = transform.parent.gameObject.GetComponent<Catapult>().rightPivot.transform.position;
		rB = gameObject.GetComponent<Rigidbody>();
		startDist = 2.0f;
		K = 33.0f;
		maxStretch = 5.0f;
		zStretch = 3.0f;
		clicked = false;
		leftSnapped = false;
		rightSnapped = false;
		prevMousePos = Vector3.zero;
	}
	void Update()
	{
		Vector3 currMousePos = Input.mousePosition;
		if (clicked)
		{
			float x = transform.position.x;
			float z = transform.position.z;
			float y = transform.position.y;
			z -= (currMousePos.x - prevMousePos.x)/50.0f;

			if(!Input.GetMouseButton(1))
			{
				x += (currMousePos.y - prevMousePos.y)/50.0f;
			}
			else
			{
				y += (currMousePos.y - prevMousePos.y)/50.0f;
			}

			z = Mathf.Clamp(z, transform.parent.position.z - zStretch, transform.parent.position.z + zStretch);
			x = Mathf.Clamp(x, transform.parent.position.x -maxStretch, transform.parent.position.x + maxStretch);
			transform.position = new Vector3(x,y, z);
		}
		prevMousePos = currMousePos;
		Vector3[] leftPosList = new Vector3[2];
		leftPosList[0] = leftParentPos;
		leftPosList[1] = leftPivot.transform.position;

		Vector3[] rightPosList = new Vector3[2];
		rightPosList[0] = rightParentPos;
		rightPosList[1] = rightPivot.transform.position;

		rightLine.SetPositions(rightPosList);
		leftLine.SetPositions(leftPosList);

		if (Input.GetMouseButtonDown(0))
		{
			rB.velocity = Vector3.zero;
			clicked = true;
		}
		else if (Input.GetMouseButtonUp(0))
		{
			clicked = false;
			Vector3 forw = new Vector3(transform.position.x + 0.3f, transform.position.y, transform.position.z);
			Instantiate(ball, forw, transform.rotation);
		}
	}
	void FixedUpdate()
	{
		cam.transform.position = new Vector3(transform.position.x - 5.0f, cam.transform.position.y, cam.transform.position.z);
		float leftMagnitude = Vector3.Distance(transform.position, leftParentPos);
		float rightMagnitude = Vector3.Distance(transform.position, rightParentPos);

		leftMagnitude -= startDist;
		rightMagnitude -= startDist;

		float leftStretch = 0.0f;
		float rightStretch = 0.0f;
		try
		{
			leftStretch = 0.3f / (leftMagnitude + startDist);
		}
		catch (System.Exception)
		{
			
			leftStretch = 0.3f / 0.0001f;
		}
		try
		{
			rightStretch = 0.3f / (rightMagnitude + startDist);
		}
		catch (System.Exception)
		{
			
			rightStretch = 0.3f / 0.0001f;
		}

		leftLine.SetWidth(leftStretch, leftStretch);
		rightLine.SetWidth(rightStretch, rightStretch);

		
		if (!clicked)
		{

			Vector3 locPos = transform.position;
			Vector3 leftVector = new Vector3(leftParentPos.x - locPos.x, leftParentPos.y - locPos.y, leftParentPos.z - locPos.z);
			Vector3 rightVector = new Vector3(rightParentPos.x - locPos.x, rightParentPos.y - locPos.y, rightParentPos.z - locPos.z);

			rB.AddForce(0.0f,-10.0f * rB.mass,0.0f,ForceMode.Force);
			rB.AddForce(leftVector * leftMagnitude * K, ForceMode.Force);
			rB.AddForce(rightVector * rightMagnitude * K, ForceMode.Force);

		}

	}
}
